import React, { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import '../NavBar/Sections/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';


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
          <a href=""><FontAwesomeIcon icon="shopping-cart"/ > (2)</a>
          <a href=""><FontAwesomeIcon icon={["far", "user"]}/> LOGIN</a>
        </div>
        <div className="sidebar" onClick={hiddenSectionClick}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
      <div className={`nav-close ${isActive ? "active" : ""}`}>
        <a href="javascript:void(0)" onClick={sideMenuClick}><FontAwesomeIcon icon="times"/></a>
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
           <a href='javascript:void()'><FontAwesomeIcon icon="times"onClick={hiddenSectionClick}/></a>
          </div>
          <h3>Welcome</h3>
          <p>
          Advertising is the way great brands get to be great brands.
          </p>
          <div className="items">
              <div className="item">
                <img src="http://placehold.it/150x150" alt="" />
              </div>
              <div class="item">
                <img src="http://placehold.it/150x150" alt="" />
              </div>
              <div class="item">
                <img src="http://placehold.it/150x150" alt="" />
              </div>
              <div class="item">
                <img src="http://placehold.it/150x150" alt="" />
              </div>
              <div class="item">
                <img src="http://placehold.it/150x150" alt="" />
              </div>
              <div class="item">
                <img src="http://placehold.it/150x150" alt="" />
              </div>
              <div class="item">
                <img src="http://placehold.it/150x150" alt="" />
              </div>
              <div class="item">
                <img src="http://placehold.it/150x150" alt="" />
              </div>
          </div>
          <h3>WE ARE AWESOME FOLOW US</h3>
          <div className="sns">
            <a href=""><FontAwesomeIcon icon={['fab', 'facebook-f']} /></a>
            <a href=""><FontAwesomeIcon icon={['fab', 'twitter']} /></a>
            <a href=""><FontAwesomeIcon icon={['fab', 'instagram']} /></a>
          </div>
        </div>




    </header>
  )
}

export default NavBar