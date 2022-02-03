import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function CartSection() {
  return (
    <div className="cart-parent">
      <Link to="/cart" className="shopping-cart">
        <FontAwesomeIcon icon="shopping-cart" />
        (2)
      </Link>
      <div className="dropdown-cart">
        <div className="cart-list">
          <div className="cart-item">
            <div className="cart-img">
              <img src="assets/product_1.png" alt="" />
            </div>
            <div className="cart-content">
              <h5>titletitletitle</h5>
              <h6>1 x 13000</h6>
            </div>
            <span>
              <FontAwesomeIcon icon="times" />
            </span>
          </div>
          <div className="cart-item">
            <div className="cart-img">
              <img src="assets/product_2.png" alt="" />
            </div>
            <div className="cart-content">
              <h5>title</h5>
              <h6>1 x 13000</h6>
            </div>
            <span>
              <FontAwesomeIcon icon="times" />
            </span>
          </div>
        </div>
        <div className="cart-total">
          <span>TOTAL: </span>
          <span>$270,000</span>
        </div>
        <div className="cart-btns">
          <Link as={Link} to="/cart">
            VIEW CART
          </Link>
          <Link as={Link} to="/checkout">
            CHECKOUT
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartSection;
