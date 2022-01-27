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

function anagram(map1, map2) {
  if (map1.size !== map2.size) return false;

  for (const [key, val] of map1) {
    if (map2.get(key) !== val || !map2.has(key)) return false;
  }

  return true;
}

function solution(s, t) {
  let answer = 0;
  const h1 = new Map();
  const h2 = new Map();

  for (const x of t) {
    if (!h1.has(x)) h1.set(x, 1);
    else h1.set(x, h1.get(x) + 1);
  }

  for (let i = 0; i < t.length - 1; i++) {
    if (!h2.has(s[i])) h2.set(s[i], 1);
    else h2.set(s[i], h2.get(s[i]) + 1);
  }

  const len = t.length - 1;

  let lt = 0;
  for (let rt = len; rt < s.length; rt++) {
    if (!h2.has(s[rt])) h2.set(s[rt], 1);
    else h2.set(s[rt], h2.get(s[rt]) + 1);

    if (anagram(h1, h2)) answer++;

    h2.set(s[lt], h2.get(s[lt]) - 1);
    if (h2.get(s[lt]) === 0) h2.delete(s[lt]);
    lt++;
  }

  return answer;
}

console.log(solution('bacaAacba', 'abc'));

export default App;
