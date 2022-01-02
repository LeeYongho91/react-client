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
function count(dist,arr) {
  let cnt = 1;
  let ep = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if(arr[i] - ep >= dist) {
      cnt++;
      ep = arr[i];
    }
  }
  
  return cnt;

}

function solution(t, arr) {
  let answer = 0;
  arr.sort((a,b) => a-b);
  let lt = 1;
  let rt = arr[arr.length-1];

  while(lt<=rt) {
    let mid = parseInt((lt+rt)/2);

    if(count(mid,arr) >= t) {
      answer = mid;
      lt = mid + 1;
    }
    else {
      rt = mid - 1;
    }
  }


  
  return answer;

}
console.log(solution(3, [1,2,8,4,9]));
// console.log(solution(3))





export default App;
