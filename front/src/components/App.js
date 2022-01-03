import { Route, Routes } from "react-router-dom";
import React, { Suspense } from 'react';
import Footer from "./views/Footer/Footer";
import LandingPage from "./views/LandingPage/LandingPage.js";
// import Auth from "../hoc/auth";
import './utils/fontawesome';


function App() {
      // null   Anyone Can go inside
      // true   only logged in user can go inside
      // false  logged in user can't go inside

  return (
    <Suspense fallback={(<div>Loading...</div>)}>
        <Routes>
        <Route path="/" element={<LandingPage />} />
          {/* <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />
          <Route exact path="/product/:productId" component={Auth(DetailProductPage, null)} />
          <Route exact path="/user/cart" component={Auth(CartPage, true)} />
          <Route exact path="/history" component={Auth(HistoryPage, true)} /> */}
        </Routes>

      <Footer />
  
    </Suspense>
      )
}


function solution(t) {
  let answer = [];
  let tmp = Array.from({length:t+1}, ()=>0);
  
  function DFS(L) {
    if(L === t+1) {
      let v = '';
      for (let i = 1; i <=t; i++) {
        if(tmp[i] === 1) {
            v += i+ ' ';
        }
      }
      if(v.length>0) answer.push(v.trim());
    } 
    else {
      tmp[L] = 1;
      DFS(L+1);
      tmp[L] = 0;
      DFS(L+1);
    }
  }
  DFS(1);
  return answer;
}
console.log(solution(3));






export default App;
