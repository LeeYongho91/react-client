import React from 'react';
import './CartPage.css';
import TextField from '@mui/material/TextField';

function CartPage() {
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
              <td>
                {' '}
                <TextField
                  id="price"
                  variant="outlined"
                  required
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  type="number"
                  size="small"
                  style={{ width: 100 }}
                  value={1}
                />
              </td>
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
              <td>
                <TextField
                  id="price"
                  variant="outlined"
                  required
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  type="number"
                  size="small"
                  style={{ width: 100 }}
                  value={1}
                />
              </td>
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
