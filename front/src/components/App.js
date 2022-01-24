/* eslint-disable no-shadow */
import { Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import LandingPage from './views/LandingPage/LandingPage';
import Container from './views/Container/Container';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import UploadProductPage from './views/UploadProductPage/UploadProductPage';
import ShopPage from './views/ShopPage/ShopPage';
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

function solution(board2) {
  const board = board2;
  let answer = 0;
  const n = board.length;
  const queue = [];

  const posX = [-1, -1, 0, 1, 1, 1, 0, -1];
  const posY = [0, 1, 1, 1, 0, -1, -1, -1];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 1) {
        answer++;
        board[i][j] = 0;
        queue.push([i, j]);

        while (queue.length) {
          const [x, y] = queue.shift();
          for (let k = 0; k < 8; k++) {
            const dx = x + posX[k];
            const dy = y + posY[k];

            if (dx >= 0 && dx < n && dy >= 0 && dy < n && board[dx][dy] === 1) {
              board[dx][dy] = 0;
              queue.push([dx, dy]);
            }
          }
        }
      }
    }
  }

  return answer;
}
console.log(
  solution([
    [1, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 0, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 0, 0],
    [1, 0, 0, 0, 1, 0, 0],
    [1, 0, 1, 0, 1, 0, 0],
  ]),
);

export default App;
