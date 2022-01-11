/* eslint-disable no-shadow */
import { Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import LandingPage from './views/LandingPage/LandingPage';
import Container from './views/Container/Container';
import LoginPage from './views/LoginPage/LoginPage';
// import Auth from "../hoc/auth";
import './utils/fontawesome';

function App() {
  // null   Anyone Can go inside
  // true   only logged in user can go inside
  // false  logged in user can't go inside

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Container>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />

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

function solution(n, f) {
  let answer = 0;
  let flag = 0;
  const dy = Array.from(Array(11), () => Array(11).fill(0));
  const ch = Array.from({ length: n + 1 }, () => 0);
  const tmp = Array.from({ length: n }, () => 0);
  const c = Array.from({ length: n }, () => 0);

  function memo(n, r) {
    if (dy[n][r] > 0) return dy[n][r];
    if (n === r || r === 0) return 1;
    return (dy[n][r] = memo(n - 1, r - 1) + memo(n - 1, r));
  }

  function DFS(L, sum) {
    if (flag) return;
    if (L === n && sum === f) {
      answer = tmp.slice();
      flag = 1;
    } else {
      for (let i = 1; i <= n; i++) {
        if (ch[i] === 0) {
          ch[i] = 1;
          tmp[L] = i;
          DFS(L + 1, sum + c[L] * tmp[L]);
          ch[i] = 0;
        }
      }
    }
  }

  for (let i = 0; i < n; i++) {
    c[i] = memo(n - 1, i);
  }

  DFS(0, 0);

  return answer;
}
console.log(solution(4, 16));

export default App;
