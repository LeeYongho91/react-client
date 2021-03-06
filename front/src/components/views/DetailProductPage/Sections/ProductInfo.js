import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import useDialog from '../../../utils/Dialogs/DialogHooks';
import { addToCart } from '../../../../_actions/user_actions';

function ProductInfo(props) {
  const price = props.Product.price || 0;
  const reviewCount = props.ReviewCount || '';
  const { title } = props.Product;
  const [qty, setQty] = useState(1);
  const priceSetting = `￦ ${parseInt(price, 10).toLocaleString()}`;
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { cartDialog, cartDupDialog, alertDialog } = useDialog();

  const addCartHandler = async () => {
    try {
      if (!user.userData.isAuth) {
        await alertDialog({
          title: '',
          body: '로그인 해주세요.',
          type: 'login',
        });
        return;
      }
      const body = {
        productId: props.Product._id,
        qty,
      };

      const cart = user.cartDetail;
      let duplicate = false;

      if (cart) {
        for (const product of cart) {
          if (props.Product._id === product._id) duplicate = true;
        }

        if (duplicate) {
          await cartDupDialog(body);
          return;
        }
      }

      await dispatch(addToCart(body));

      cartDialog();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const cartQtyChange = e => {
    if (e.target.value >= 1) setQty(e.target.value);
  };

  return (
    <div className="product-detail-desc">
      <h2>{title}</h2>
      <span>{price > 0 && priceSetting}</span>
      <span>CUSTOMER REVIEW ( {reviewCount} )</span>
      <div className="product-detail-tag">
        SKU: 008 <br />
        <br />
        Categories: Decoration, Home Decor <br />
        <br />
        Tags: Black, Modern
      </div>
      <div className="product-detail-cart">
        <TextField
          id="outlined-number"
          label="Quantity"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={qty}
          onChange={cartQtyChange}
          className="cart-qty-field"
        />
        <button className="cart-btn" onClick={addCartHandler}>
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductInfo;
