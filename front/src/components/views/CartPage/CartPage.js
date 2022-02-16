import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getCartItems,
  removeCartItem,
  onSuccessBuy,
} from '../../../_actions/user_actions';
import './CartPage.css';

import CartItem from './Sections/CartItem';
import Paypal from '../../utils/Paypal';
import { loadingToggleAction } from '../../../_actions/util_actions';

function CartPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Total, setTotal] = useState(0);
  const [shipping, setShipping] = useState(0);

  const calculateTotal = cartDetail => {
    let total = 0;

    cartDetail.forEach(item => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    setTotal(total);
  };

  useEffect(async () => {
    const cartItems = [];
    // 리덕스 User state안에 cart 안에 상품이 들어있는지 확인
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach(item => {
          cartItems.push(item.id);
        });
        dispatch(loadingToggleAction(true));
        const data = await dispatch(
          getCartItems(cartItems, props.user.userData.cart),
        );
        dispatch(loadingToggleAction(false));
        if (props.user.userData.cart.length > 0) setShipping(1500);
        calculateTotal(data.payload);
      }
    }
  }, [props.user.userData]);

  const removeFromCart = async productId => {
    const data = await dispatch(removeCartItem(productId));
    if (data.payload.productInfo.length <= 0) {
      setTotal(0);
      setShipping(0);
    }
  };

  const pageMove = () => {
    navigate(`/shop`);
  };

  const transactionSuccess = data => {
    dispatch(
      onSuccessBuy({
        paymentData: data,
        cartDetail: props.user.cartDetail,
      }),
    ).then(response => {
      if (response.payload.success) {
        console.log(response.payload);
        // setShowTotal(false);
        // setShowSuccess(true);
        setTotal(0);
        setShipping(0);
      }
    });
  };

  return (
    <div className="cart-layout">
      <div className="inner">
        <div className="cart-title">
          <h1>Shopping Cart</h1>
        </div>
        <CartItem
          products={props.user.cartDetail}
          removeItem={removeFromCart}
        />

        <div className="cart-prev-btn">
          <button onClick={() => pageMove()}>Continue Shopping</button>
        </div>

        <div className="cart-checkout-layout">
          <div className="cart-checkout-content">
            <div className="cart-subtotal cart-checkout-common">
              <span>Subtotal</span>
              <span>{Total.toLocaleString()}</span>
            </div>
            <div className="cart-shipping cart-checkout-common">
              <span>Shipping</span>
              <span>{shipping.toLocaleString()}</span>
            </div>
            <div className="cart-total-price cart-checkout-common">
              <span>Total</span>
              <span>{(Total + shipping).toLocaleString()}</span>
            </div>
            <div className="cart-checkout-btn">
              <Paypal
                className="paypal-btn"
                total={Total + shipping}
                onSuccess={transactionSuccess}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
