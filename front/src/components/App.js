/* eslint-disable no-shadow */
import { Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import LandingPage from './views/LandingPage/LandingPage';
import Container from './views/Container/Container';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import UploadProductPage from './views/UploadProductPage/UploadProductPage';
import ShopPage from './views/ShopPage/ShopPage';
import DetailProductPage from './views/DetailProductPage/DetailProductPage';
import Auth from '../hoc/auth';
import './utils/fontawesome';

function App() {
  // null   Anyone Can go inside
  // true   only logged in user can go inside
  // false  logged in user can't go inside

  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegister = Auth(RegisterPage, false);
  const AuthUploadProductPage = Auth(UploadProductPage, true);
  const AuthShopPage = Auth(ShopPage, null);
  const AuthDetailProductPage = Auth(DetailProductPage, null);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Container>
          <Routes>
            <Route path="/" element={<AuthLandingPage />} />
            <Route path="/login" element={<AuthLoginPage />} />
            <Route path="/signup" element={<AuthRegister />} />
            <Route path="/upload" element={<AuthUploadProductPage />} />
            <Route path="/shop" element={<AuthShopPage />} />
            <Route
              path="/product/:productId"
              element={<AuthDetailProductPage />}
            />
            {/* <Route exact path="/login" component={Auth(LoginPage, false)} /> */}
            {/*
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />
          <Route exact path="/product/:productId" component={Auth(DetailProductPage, null)} />
          <Route exact path="/user/cart" component={Auth(CartPage, true)} />
          <Route exact path="/history" component={Auth(HistoryPage, true)} /> */}
          </Routes>
        </Container>
      </Suspense>
    </>
  );
}

function solution(n, arr) {
  const answer = Array.from({ length: n }, () => 0);

  arr.forEach(x => {
    let idx = -1;

    for (let i = 0; i < answer.length; i++) {
      if (answer[i] === x) {
        idx = i;
      }
    }

    if (idx === -1) {
      for (let i = n - 1; i >= 1; i--) {
        answer[i] = answer[i - 1];
      }
    } else {
      for (let i = idx; i >= 1; i--) {
        answer[i] = answer[i - 1];
      }
    }
    answer[0] = x;
  });

  return answer;
}
console.log(solution(5, [1, 2, 3, 2, 6, 2, 3, 5, 7]));

export default App;
