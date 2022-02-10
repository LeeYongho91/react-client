import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  getCartItems,
  // removeCartItem,
  // onSuccessBuy,
} from '../../../_actions/user_actions';

import './CartPage.css';

function CartPage(props) {
  const dispatch = useDispatch();
  useEffect(async () => {
    const cartItems = [];

    // 리덕스 User state안에 cart 안에 상품이 들어있는지 확인
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach(item => {
          cartItems.push(item.id);
        });

        const data = await dispatch(
          getCartItems(cartItems, props.user.userData.cart),
        );
        console.log(data);
      }
    }
  }, [props.user.userData]);
  return (
    <div className="cart-layout">
      <div className="inner">
        <div className="cart-title">
          <h1>Shopping Cart</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>PRODUCT</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>SUBTOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="cart-product">
                  <div className="cart-image">
                    <img src="/assets/product_1.png" alt="" />
                  </div>
                  <div className="cart-desc">
                    <span>Bold Wall Clock White</span>
                    <div className="cart-remove">Remove item</div>
                  </div>
                </div>
              </td>
              <td>$119.00</td>
              <td>2</td>
              <td>$119.00</td>
            </tr>
            <tr>
              <td>
                <div className="cart-product">
                  <div className="cart-image">
                    <img src="/assets/product_1.png" alt="" />
                  </div>
                  <div className="cart-desc">
                    <span>Bold Wall Clock White</span>
                    <div className="cart-remove">Remove item</div>
                  </div>
                </div>
              </td>
              <td>$119.00</td>
              <td>2</td>
              <td>$119.00</td>
            </tr>
          </tbody>
        </table>

        <div className="cart-prev-btn">
          <button>Continue Shopping</button>
        </div>

        <div className="cart-checkout-layout">
          <div className="cart-checkout-content">
            <div className="cart-subtotal cart-checkout-common">
              <span>Subtotal</span>
              <span>$157.00</span>
            </div>
            <div className="cart-shipping cart-checkout-common">
              <span>Shipping</span>
              <span>$15.00</span>
            </div>
            <div className="cart-total-price cart-checkout-common">
              <span>Total</span>
              <span>$172.00</span>
            </div>
            <div className="cart-checkout-btn">
              <button>Proceed to Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
