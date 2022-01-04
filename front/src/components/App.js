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
  let answer = Number.MIN_SAFE_INTEGER;
  let n = arr.length;
  
  function DFS(L,sum1,sum2) {
    if(sum2 > m) return;
    if(L === n) {
        answer = Math.max(answer, sum1);
    }
    else {
      DFS(L+1,sum1+arr[L][0],sum2+arr[L][1]);
      DFS(L+1,sum1,sum2);
    }
  }

  DFS(0,0,0);
  return answer;
}
console.log(solution(20,[[10,5],[25,12],[15,8],[6,3],[7,4]]));






export default App;
