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
import CartPage from './views/CartPage/CartPage';
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
  const AuthCartPage = Auth(CartPage, null);

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
            <Route path="/cart" element={<AuthCartPage />} />
          </Routes>
        </Container>
      </Suspense>
    </>
  );
}

function solution(n, f) {
  let answer = 0;
  const dy = Array.from(Array(11), () => Array(11).fill(0));
  const tmp = Array.from({ length: n }, () => 0);
  const v = Array.from({ length: n }, () => 0);
  const ch = Array.from({ length: n + 1 }, () => 0);
  let flag = 0;

  function memo(n, r) {
    if (dy[n][r] > 0) return dy[n][r];
    if (n === r || r === 0) return 1;
    return (dy[n][r] = memo(n - 1, r - 1) + memo(n - 1, r));
  }

  function DFS(L, sum) {
    if (flag) return;
    if (L === n && sum === f) {
      answer = v.slice();
      flag = 1;
    } else {
      for (let i = 1; i <= n; i++) {
        if (ch[i] === 0) {
          ch[i] = 1;
          v[L] = i;
          DFS(L + 1, sum + v[L] * tmp[L]);
          ch[i] = 0;
        }
      }
    }
  }

  for (let i = 0; i < n; i++) {
    tmp[i] = memo(n - 1, i);
  }

  DFS(0, 0);

  return answer;
}
console.log(solution(4, 16));

export default App;
