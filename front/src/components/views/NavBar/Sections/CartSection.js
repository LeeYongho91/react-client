import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import {
  getCartItems,
  removeCartItem,
} from '../../../../_actions/user_actions';

function CartSection(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const cartCount =
    (user.userData && user.userData.isAuth && user.userData.cart.length) || 0;
  const [Total, setTotal] = useState(0);
  const browserWidth =
    window.innerWidth > 0 ? window.innerWidth : window.screen.width;
  const browserWidthValue = 768;

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -2,
      top: -5,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '2px 6px',
    },
  }));

  const calculateTotal = cartDetail => {
    let total = 0;

    cartDetail.forEach(item => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    setTotal(total);
  };

  const removeFromCart = async productId => {
    const data = await dispatch(removeCartItem(productId));
    if (data.payload.productInfo.length <= 0) {
      setTotal(0);
    }
  };

  useEffect(async () => {
    const cartItems = [];
    // 리덕스 User state안에 cart 안에 상품이 들어있는지 확인
    if (user.userData && user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach(item => {
          cartItems.push(item.id);
        });
        const data = await dispatch(
          getCartItems(cartItems, user.userData.cart),
        );
        calculateTotal(data.payload);
      }
    }
  }, [user.userData]);

  const renderItems = () =>
    user.userData && user.userData.isAuth && user.userData.cart.length > 0 ? (
      user.cartDetail &&
      user.cartDetail.map((product, index) => (
        <div className="cart-item" key={index}>
          <div className="cart-img">
            <img
              src={`${process.env.REACT_APP_API_URL}/${product.images[0]}`}
              alt={product.title}
            />
          </div>
          <div className="cart-content">
            <h5>{product.title}</h5>
            <h6>
              {product.quantity} x {product.price.toLocaleString()}
            </h6>
          </div>
          <span>
            <FontAwesomeIcon
              icon="times"
              onClick={() => removeFromCart(product._id)}
            />
          </span>
        </div>
      ))
    ) : (
      <div className="cart-no-products">No Products in Cart</div>
    );

  const closeSideMenu = () => {
    props.closeSideMenu();
  };

  return (
    <div className="cart-parent">
      <Link to="/cart" className="shopping-cart" onClick={closeSideMenu}>
        <StyledBadge
          badgeContent={user.userData && user.userData.isAuth ? cartCount : 0}
          color="primary"
        >
          <FontAwesomeIcon icon="shopping-cart" className="cart-icon" />
          <span className="cart-text">CART</span>
        </StyledBadge>
      </Link>
      {browserWidth > browserWidthValue && (
        <div className="dropdown-cart">
          <div className="cart-list">{renderItems()}</div>
          {user.userData &&
            user.userData.isAuth &&
            user.userData.cart.length > 0 && (
              <div className="cart-total">
                <span>TOTAL: </span>
                <span>{Total.toLocaleString()}</span>
              </div>
            )}

          <div className="cart-btns">
            <Link as={Link} to="/cart">
              VIEW CART
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartSection;
