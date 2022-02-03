import React, { useState, useEffect, useMemo } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';
import { throttle } from 'lodash';
import HideSection from './Sections/HideSection';

import NavSection from './Sections/NavSection';

function NavBar() {
  const [isActive, setActive] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(false);
  const [isScroll, setScroll] = useState(false);
  const [hdnActive, setHdnActive] = useState(false);
  const pathName = useLocation().pathname;
  const [browserWidthValue] = useState(768);

  const hiddenSectionClick = () => {
    setHdnActive(!hdnActive);
  };

  const sideMenuClick = () => {
    setActive(!isActive);
  };

  const scrollActiveCheck = url => {
    let bool = '';
    if (url === '/') {
      bool = true;
    } else if (url === '/register') {
      bool = false;
    } else if (url === '/login') {
      bool = false;
    } else if (url === '/shop') {
      bool = false;
    }
    return bool;
  };

  const updateScroll = useMemo(
    () =>
      throttle(() => {
        setScroll(scrollActiveCheck(pathName));
        const browserWidth =
          window.innerWidth > 0 ? window.innerWidth : window.screen.width;
        const scrollCheck = window.scrollY >= 200;
        if (
          isScroll &&
          browserWidth > browserWidthValue &&
          scrollCheck !== scrollPosition
        )
          setScrollPosition(scrollCheck);
        else if (browserWidth < browserWidthValue) setScrollPosition(false);
      }, 100),
    [scrollPosition, isScroll],
  );

  useEffect(() => {
    setScroll(scrollActiveCheck(pathName));
    if (!isScroll) setScrollPosition(false);
    window.addEventListener('scroll', updateScroll);
    return () => {
      window.removeEventListener('scroll', updateScroll);
    };
  }, [updateScroll, pathName]);

  return (
    <header>
      <NavSection
        scrollPosition={scrollPosition}
        isActive={isActive}
        hiddenSectionClick={hiddenSectionClick}
      />
      <HideSection
        hdnActive={hdnActive}
        hiddenSectionClick={hiddenSectionClick}
      />

      {/* mobile menu tag and close button */}
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
    </header>
  );
}

export default NavBar;
