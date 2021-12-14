import { Route, Routes } from "react-router-dom";
import NavBar from "./views/NavBar/NavBar";
import React, { Suspense } from 'react';
import { Icon } from 'antd';


function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
    <NavBar />

    <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        {/* <Routes>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />
          <Route exact path="/product/:productId" component={Auth(DetailProductPage, null)} />
          <Route exact path="/user/cart" component={Auth(CartPage, true)} />
          <Route exact path="/history" component={Auth(HistoryPage, true)} />
        </Routes> */}
      </div>

    <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
           <p> Happy Coding  <Icon type="smile" /></p>
        </div>

    </Suspense>
      )
}

function solution(n) {

  function test(L) {
      if(L < 1) return;

      test(L-1);
      console.log(L)
  }

  test(n);

}

solution(3);
// console.log(solution(3))





export default App;
