import React, { useState } from 'react';
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


  return (
    <header>
      <div className="title">DEPOT</div>
      <nav className={`${isActive ? "active" : ""}`}>
        <ul className="gnb">
          <li><a href="#none">Home</a></li>
          <li><a href="#none">Shop</a></li>
          <li><a href="#none">Blog</a></li>
          <li><a href="#none">Cart</a></li>
          <li><a href="#none">Contact</a></li>
        </ul>
        <div className="submenu">
          <a href="/cart"><FontAwesomeIcon icon="shopping-cart"/ > (2)</a>
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