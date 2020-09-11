import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  constructor() {
    super();
    console.log("Gonna create component");

    // ES6 binding method
    //this.goToStore = this.goToStore.bind(this);
  }

  // create empty form input ref
  myInput = React.createRef();

  // to access _this_ in custom methods, convert method to a property using an arrow function
  // or use ES6 binding method where it would be a method definition:
    // goToStore(event) {
  goToStore = (event) => {
    // stop form ssubmit
    event.preventDefault();
    // get text from input
    const storeName = this.myInput.current.defaultValue;
    // change route to store
    this.props.history.push(`/store/${storeName}`);
  }

  render() {
    return (
      <form className="store-selector" onSubmit={ this.goToStore } >
        <h2>Please Enter A Store</h2>
        {/* Use defaultValue instead of value to call getFunName helper fn */}
        <input
          type="text"
          ref={this.myInput}
          required
          placeholder="Store Name"
          defaultValue={ getFunName() }
        />
        <button type="submit">Visit Store</button>
      </form>
    );
  }
}

export default StorePicker;
