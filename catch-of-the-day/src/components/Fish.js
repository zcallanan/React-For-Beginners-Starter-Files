import React from 'react';
import { formatPrice } from '../helpers'
class Fish extends React.Component {
  handleClick = () => {
    this.props.addToOrder(this.props.index);
  }

  render() {
    const { image, name, desc, price, status } = this.props.details;
    const isAvailable = status === 'available';

    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p className="desc">{desc}</p>
        <button
          // alternatively this could be: onClick={ () => this.props.addToOrder(this.props.index) }
          onClick={this.handleClick}
          disabled={!isAvailable}>{isAvailable ? "Add To Order" : "Sold Out"}
        </button>
      </li>
    );
  }
}

export default Fish;
