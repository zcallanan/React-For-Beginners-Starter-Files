import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  // Initial empty state
  state = {
    fishes: {},
    order: {}
  };

  // syncing a store's fishes to firebase db
  componentDidMount() {
    const { params } = this.props.match; // destructured object
    // First reinstate order state from local storage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    // sync fishes state to firebase
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }

  componentDidUpdate() {
    // on component Order update, save latest order as a string to local storage
    const { params } = this.props.match;
    localStorage.setItem(params.storeId, JSON.stringify(this.state.order));
    console.log('it updated!');
  }

  // Cleans up listening for state changes if the app's store is no longer mounted, preventing a leak
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  // Update state method, to be called in AddFishForm two levels down
    // Passed to children using props
  addFish = fish => {
    // 1. Take a copy of the existing state. Copy to avoid mutation!
    const fishes = { ...this.state.fishes }
    // 2. Add our new fish to fishes
    fishes[`fish${Date.now()}`] = fish;
    // 3. Update this.state.fishes to new fishes object
      // this.setState({ fishes: fishes });
        // since property and state are same thing, in ES6 can just pass fishes
    this.setState({ fishes });
  }

  // method to import fishes in Inventory
  loadSampleFishes = () => {
    this.setState( { fishes: sampleFishes });
  }

  addToOrder = key => {
    // 1. Copy state
    const order = { ...this.state.order };
    // 2. Either add to the order, or update the number in our order
    order[key] = order[key] + 1 || 1;
    // 3. Call setState to update our state object
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => <Fish
              key={key}
              details={this.state.fishes[key]}
              addToOrder={this.addToOrder}
              index={key} // pass key to Fish as props in order to access it from button addToOrder
            />)}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}/>
      </div>
    );
  }
}

export default App;
