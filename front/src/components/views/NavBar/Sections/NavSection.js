import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import CartSection from './CartSection';
import { AUTH_SERVER } from '../../../Config';
import { loadingToggleAction } from '../../../../_actions/util_actions';

function NavSection(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);

  const logout = async e => {
    e.preventDefault();
    try {
      dispatch(loadingToggleAction(true));
      const res = await axios.get(`${AUTH_SERVER}/logout`);
      if (res.status === 200) {
        dispatch(loadingToggleAction(false));
        dispatch({ type: 'clear_cart_clear' });
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hiddenSectionClick = () => {
    props.hiddenSectionClick();
  };

  return (
    <>
      <div className={`title ${props.scrollPosition ? 'active' : ''}`}>
        <Link to="/">ECRU WORLD</Link>
      </div>
      <nav
        className={`${props.isActive ? 'active' : ''} ${
          props.scrollPosition ? 'scroll-active' : ''
        }`}
      >
        <ul className="gnb">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <div className="submenu">
          <CartSection />
          {user.userData && !user.userData.isAuth ? (
            <Link to="/login">
              <FontAwesomeIcon icon={['far', 'user']} /> LOGIN
            </Link>
          ) : (
            <>
              <a href="true" onClick={logout}>
                <FontAwesomeIcon icon="sign-out-alt" /> LOGOUT
              </a>
              <Link to="/history">
                <FontAwesomeIcon icon="list" /> HISTORY
              </Link>
              <Link to="/upload">
                <FontAwesomeIcon icon="upload" /> UPLOAD
              </Link>
            </>
          )}
        </div>
        <div className="sidebar" onClick={hiddenSectionClick}>
          <span />
          <span />
          <span />
        </div>
      </nav>
    </>
  );
}

export default NavSection;
