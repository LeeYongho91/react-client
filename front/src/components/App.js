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


function solution(m,arr) {
  let answer = [];
  let n = arr.length;
  let ch = Array.from({length:n}, ()=>0);
  let tmp = Array.from({length:m}, ()=>0);
    
  function DFS(L) {
    if(L === m) {
      answer.push(tmp.slice());
    }
    else {
      for (let i = 0; i < n; i++) {
        if(ch[i] === 0) {
          ch[i] = 1;
          tmp[L] = arr[i];
          DFS(L+1);
          ch[i] = 0;
        }
      }
    }
  }
  DFS(0); 
  return answer;
}
console.log(solution(2,[3,6,9]));




export default App;
