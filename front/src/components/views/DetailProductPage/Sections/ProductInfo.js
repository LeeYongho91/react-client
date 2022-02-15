import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
// import { UseBasicModalExample } from '../../../utils/Dialogs/DialogHooks';
import { addToCart } from '../../../../_actions/user_actions';
import { showDialogAction } from '../../../../_actions/util_actions';

function ProductInfo(props) {
  const price = props.Product.price || 0;
  const reviewCount = props.ReviewCount || '';
  const { title } = props.Product;
  const [qty, setQty] = useState(1);
  const priceSetting = `￦ ${parseInt(price, 10).toLocaleString()}`;
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const addCartHandler = async () => {
    try {
      if (!user.userData.isAuth) {
        alert('로그인 해주세요');
        return;
      }
      const body = {
        productId: props.Product._id,
        qty,
      };

      const cart = user.cartDetail;
      let duplicate = false;

      for (const product of cart) {
        if (props.Product._id === product._id) duplicate = true;
      }

      if (duplicate) {
        await dispatch(
          showDialogAction({
            title: '',
            body: '이미 장바구니에 있는 상품입니다. 추가 하시겠습니까?',
            product: body,
          }),
        );

        return;
      }

      const data = await dispatch(addToCart(body));
      console.log(data);
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
        />
        <button className="cart-btn" onClick={addCartHandler}>
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductInfo;
