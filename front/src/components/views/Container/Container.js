import React, { useState, useEffect } from 'react';
import './Container.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import Spinner from '../../utils/Spinner/Spinner';
import CartAlert from '../../utils/Dialogs/CartAlert';
import Alert from '../../utils/Dialogs/Alert';

function Container({ children }) {
  const [BtnStatus, setBtnStatus] = useState(false); // 버튼 상태
  const util = useSelector(state => state.util);
  const location = useLocation();
  const [scrollY] = useState(300);

  const handleFollow = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > scrollY) {
      // 300 이상이면 버튼이 보이게
      setBtnStatus(true);
    } else if (scrolled <= scrollY) {
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
    window.scrollTo(0, 0);
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow);
    };
  }, [location]);

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
      {util.showLoading && <Spinner />}
      <CartAlert />
      <Alert />
    </div>
  );
}

export default Container;
