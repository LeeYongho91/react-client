import React, { useState,useEffect } from 'react';
import '../NavBar/Sections/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function NavBar() {
  const [isActive, setActive] = useState(false);
  const [hdnActive, setHdnActive] = useState(false);


  const sideMenuClick = () => {
    setActive(!isActive);
  }

  const hiddenSectionClick = () => {
    setHdnActive(!hdnActive);
  } 

  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    // console.log(window.scrollY)

    if(window.scrollY > 0) {
      if(isActive) {
        setActive(!isActive);
      }
    }

      setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  }
  useEffect(()=>{
      window.addEventListener('scroll', updateScroll);
  });
 



  return (
    <header>
      <div className={`title ${scrollPosition < 200 ? "" : "active"}`}>DEPOT</div>
      <nav className={`${isActive ? "active" : ""} ${scrollPosition < 200 ? "" : "scroll-active"}`}>
        <ul className="gnb">
          <li><a href="#none">Home</a></li>
          <li><a href="#none">Shop</a></li>
          <li><a href="#none">Blog</a></li>
          <li><a href="#none">Cart</a></li>
          <li><a href="#none">Contact</a></li>
        </ul>
        <div className="submenu">
          <a href="/cart" className='shopping-cart'><FontAwesomeIcon icon="shopping-cart"/ >(2)</a>
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
                  <span><FontAwesomeIcon icon="times"/></span>
                </div>
                <div className="cart-item">
                <div className="cart-img">
                    <img src="assets/product_2.png" alt="" />
                  </div>
                  <div className="cart-content">
                    <h5>title</h5>
                    <h6>1 x 13000</h6>
                  </div>
                  <span><FontAwesomeIcon icon="times"/></span>
                </div>
              </div>
              <div className="cart-total">
                <span>TOTAL: </span>
                <span>$270,000</span>
              </div>
              <div className="cart-btns">
              <a href=''>VIEW CART</a>
              <a href=''>CHECKOUT</a>
              </div>
            
          </div>
          <a href="/login"><FontAwesomeIcon icon={["far", "user"]}/> LOGIN</a>
        </div>
        <div className="sidebar" onClick={hiddenSectionClick}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
      <div className={`nav-close ${isActive ? "active" : ""}`}>
        <span onClick={sideMenuClick}><FontAwesomeIcon icon="times"/></span>
      </div>
      <div className={`sidemenu ${isActive ? "active" : ""}`} onClick={sideMenuClick}>
          <span>MENU</span>
          <div className="trigger">
          <span></span>
          <span></span>
          <span></span>
        </div>
        </div>

        <div className={`hidden-section ${hdnActive ? "active" : ""}`}>
          <div className="close">
           <span onClick={hiddenSectionClick}><FontAwesomeIcon icon="times"/></span>
          </div>
          <h3>Welcome</h3>
          <p>
          Advertising is the way great brands get to be great brands.
          </p>
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
            <span><FontAwesomeIcon icon={['fab', 'facebook-f']} /></span>
            <span><FontAwesomeIcon icon={['fab', 'twitter']} /></span>
            <span><FontAwesomeIcon icon={['fab', 'instagram']} /></span>
          </div>
        </div>
    </header>
  )
}

export default NavBar