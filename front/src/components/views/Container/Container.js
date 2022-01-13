import React, { useState, useEffect } from 'react';
import './Container.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

function Container({ children }) {
  const [BtnStatus, setBtnStatus] = useState(false); // 버튼 상태
  console.log(children);
  const handleFollow = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      // 300 이상이면 버튼이 보이게
      setBtnStatus(true);
    } else if (scrolled <= 300) {
      // 300 이하면 버튼이 사라지게
      setBtnStatus(false);
    }
  };

  const handleTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow);
    };
  });
  return (
    <div className="container">
      <NavBar />
      {children}
      <Footer />
      <button
        onClick={handleTop}
        className={`gototop ${BtnStatus ? 'active' : ''}`}
      >
        <FontAwesomeIcon icon="angle-up" />
      </button>
    </div>
  );
}

export default Container;
