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
          </Routes>
        </Container>
      </Suspense>
    </>
  );
}

function count(t, arr) {
  let cnt = 1;
  let ep = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] - ep >= t) {
      cnt++;
      ep = arr[i];
    }
  }

  return cnt;
}

function solution(t, arr) {
  let answer = Number.MIN_SAFE_INTEGER;
  arr.sort((a, b) => a - b);
  let lt = 1;
  let rt = arr[arr.length - 1];
  let mid = 0;
  while (lt <= rt) {
    mid = parseInt((lt + rt) / 2, 10);
    if (count(mid, arr) >= t) {
      answer = mid;
      lt = mid + 1;
    } else {
      rt = mid - 1;
    }
  }

  return answer;
}
console.log(solution(3, [1, 2, 8, 4, 9]));

export default App;
