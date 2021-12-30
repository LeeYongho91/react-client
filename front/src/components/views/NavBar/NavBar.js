import React, { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import '../NavBar/Sections/Navbar.css';


function NavBar() {


  return (
    <header>
      <div className="title">DEPOT</div>
      <nav>
        <ul className='gnb'>
          <li><a href="#none">Home</a></li>
          <li><a href="#none">Shop</a></li>
          <li><a href="#none">Blog</a></li>
          <li><a href="#none">Cart</a></li>
          <li><a href="#none">Contact</a></li>
        </ul>
        <div class="submenu">
          <a href="">CART</a>
          <a href="">찜</a>
          <a href="">LOGIN</a>
        </div>

        <div className="sidebar">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
      <div class="side-menu">
          <span>MENU</span>
          <div class="trigger">
          <span></span>
          <span></span>
          <span></span>
        </div>
        </div>
    </header>
  )
}

export default NavBar