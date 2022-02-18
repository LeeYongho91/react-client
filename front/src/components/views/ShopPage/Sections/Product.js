import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useDialog from '../../../utils/Dialogs/DialogHooks';
import { addToCart } from '../../../../_actions/user_actions';

function Product(props) {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const { cartDialog, cartDupDialog, alertDialog } = useDialog();
  const dispatch = useDispatch();

  const productDetailMove = () => {
    navigate(`/product/${props.product._id}`);
  };

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
        productId: props.product._id,
        qty: 1,
      };

      const cart = user.cartDetail;
      let duplicate = false;

      if (cart) {
        for (const product of cart) {
          if (props.product._id === product._id) duplicate = true;
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

  return (
    <div
      className={`product-content ${
        props.index % 4 === 3 || props.index === 3 ? 'four-product' : ''
      }`}
    >
      <div className="product-image" onClick={productDetailMove}>
        <img
          src={`${process.env.REACT_APP_API_URL}/${props.product.images[0]}`}
          alt="product_1"
        />
      </div>
      <div className="product-desc">
        <h2>{props.product.title}</h2>
        <div className="product-price">
          <div className="product-price-child">
            <div onClick={addCartHandler}>ADD TO CART</div>
            <div>￦ {props.product.price.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
