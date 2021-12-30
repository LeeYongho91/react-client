import { Route, Routes } from "react-router-dom";
import React, { Suspense } from 'react';
import Footer from "./views/Footer/Footer";
import LandingPage from "./views/LandingPage/LandingPage.js";
// import Auth from "../hoc/auth";


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

function solution(arr) {
  let answer = 'YES';
  let n = arr.length;
  let ch = Array.from({length:n}, ()=>0);

  function DFS(L) {
      if(L === n+1) {
    
        let sum = 0;
          for (let i = 0; i < n; i++) {
            if(ch[i] === 1) {
                sum+=arr[i]
            }
          }
          
      }
      else {
      ch[L] = 1;  
      DFS(L+1);
      ch[L] = 0;
      DFS(L+1);
      }

  }

  DFS(1);

  return answer;

}
console.log(solution([,1,3,5,6,7,10]));
// console.log(solution(3))





export default App;
