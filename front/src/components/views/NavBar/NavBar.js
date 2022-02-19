import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  const side = useRef();

  const hiddenSectionClick = () => {
    setHdnActive(!hdnActive);
  };

  const sideMenuClick = () => {
    console.log('test2');
    setActive(!isActive);
  };

  const scrollActiveCheck = url => {
    let bool = '';
    if (url === '/') {
      bool = true;
    } else {
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

  const handleClose = async e => {
    // console.log('test');
    const sideCildren = side.current.contains(e.target);
    if (isActive && sideCildren === false) {
      setActive(!isActive);
    }
  };

  useEffect(() => {
    setScroll(scrollActiveCheck(pathName));
    if (!isScroll) setScrollPosition(false);
    window.addEventListener('scroll', updateScroll);
    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.addEventListener('click', handleClose);
    };
  }, [updateScroll, pathName]);

  const closeSideMenu = () => {
    setActive(false);
  };

  return (
    <header ref={side}>
      <NavSection
        scrollPosition={scrollPosition}
        isActive={isActive}
        hiddenSectionClick={hiddenSectionClick}
        closeSideMenu={closeSideMenu}
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
