import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
  // Initial empty state
  state = {
    fishes: {},
    order: {}
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

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => <Fish
              key={key}
              details={this.state.fishes[key]}
            />)}
          </ul>
        </div>
        <Order />
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}/>
      </div>
    );
  }
}

export default App;
