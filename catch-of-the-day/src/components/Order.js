import React from 'react';
import { formatPrice } from '../helpers'

class Order extends React.Component {
  // render function that moves some rendering logic out of render()
  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === 'available'

    // Make sure the fish is loaded before we continue
    if (!fish) return null;

    // if status is unavailable then
    if (!isAvailable) {
      return (
        <li key={key}>
          Sorry {fish ? fish.name : 'fish'} is no longer available
        </li>
      )
    }

    // adjust order if fish's status is available
    return (
      <li key={key}>
        {count} lbs. {fish.name}
        <span>{formatPrice(count * fish.price)}</span>
      </li>
    )
  };
  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      // if the fish is available for sale, then add its count * price onto the previous total
      if(isAvailable) {
        return prevTotal + (count * fish.price)
      }
      // if not available, then just return previous total
      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2 className="order-title">Order</h2>

        <ul className="order"> {orderIds.map(key => this.renderOrder(key))} </ul>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
