import React, { useState, useEffect, useMemo } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import { throttle } from 'lodash';

function NavBar() {
  const [isActive, setActive] = useState(false);
  const [hdnActive, setHdnActive] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(false);
  const [isScroll, setScroll] = useState(false);
  const pathName = useLocation().pathname;

  const sideMenuClick = () => {
    setActive(!isActive);
  };

  const hiddenSectionClick = () => {
    setHdnActive(!hdnActive);
  };

  const scrollActiveCheck = url => {
    let bool = '';
    if (url === '/') {
      bool = true;
    } else if (url === '/register') {
      bool = false;
    } else if (url === '/login') {
      bool = false;
    }
    return bool;
  };

  const updateScroll = useMemo(
    () =>
      throttle(() => {
        const browserWidth =
          window.innerWidth > 0 ? window.innerWidth : window.screen.width;
        const scrollCheck = window.scrollY >= 200;
        if (isScroll && browserWidth > 768 && scrollCheck !== scrollPosition)
          setScrollPosition(scrollCheck);
        else if (browserWidth < 768) setScrollPosition(false);
      }, 100),
    [scrollPosition, isScroll],
  );

  useEffect(() => {
    setScroll(scrollActiveCheck(pathName));
    window.addEventListener('scroll', updateScroll);
    return () => {
      window.removeEventListener('scroll', updateScroll);
    };
  }, [updateScroll, pathName]);

  return (
    <header>
      <div className={`title ${scrollPosition ? 'active' : ''}`}>DEPOT</div>
      <nav
        className={`${isActive ? 'active' : ''} ${
          scrollPosition ? 'scroll-active' : ''
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
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <div className="submenu">
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
              <Link to="/cart">VIEW CART</Link>
              <Link to="/checkout">CHECKOUT</Link>
            </div>
          </div>
          <Link to="/login">
            <FontAwesomeIcon icon={['far', 'user']} /> LOGIN
          </Link>
        </div>
        <div className="sidebar" onClick={hiddenSectionClick}>
          <span />
          <span />
          <span />
        </div>
      </nav>
      <div className={`nav-close ${isActive ? 'active' : ''}`}>
        <span onClick={sideMenuClick}>
          <FontAwesomeIcon icon="times" />
        </span>
      </div>
      <div
        className={`sidemenu ${isActive ? 'active' : ''}`}
        onClick={sideMenuClick}
      >
        <span>MENU</span>
        <div className="trigger">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className={`hidden-section ${hdnActive ? 'active' : ''}`}>
        <div className="close">
          <span onClick={hiddenSectionClick}>
            <FontAwesomeIcon icon="times" />
          </span>
        </div>
        <h3>Welcome</h3>
        <p>Advertising is the way great brands get to be great brands.</p>
        <div className="items">
          <div className="item">
            <img src="http://placehold.it/150x150" alt="" />
          </div>
          <div className="item">
            <img src="http://placehold.it/150x150" alt="" />
          </div>
          <div className="item">
            <img src="http://placehold.it/150x150" alt="" />
          </div>
          <div className="item">
            <img src="http://placehold.it/150x150" alt="" />
          </div>
          <div className="item">
            <img src="http://placehold.it/150x150" alt="" />
          </div>
          <div className="item">
            <img src="http://placehold.it/150x150" alt="" />
          </div>
          <div className="item">
            <img src="http://placehold.it/150x150" alt="" />
          </div>
          <div className="item">
            <img src="http://placehold.it/150x150" alt="" />
          </div>
        </div>
        <h3>WE ARE AWESOME FOLOW US</h3>
        <div className="sns">
          <span>
            <FontAwesomeIcon icon={['fab', 'facebook-f']} />
          </span>
          <span>
            <FontAwesomeIcon icon={['fab', 'twitter']} />
          </span>
          <span>
            <FontAwesomeIcon icon={['fab', 'instagram']} />
          </span>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
