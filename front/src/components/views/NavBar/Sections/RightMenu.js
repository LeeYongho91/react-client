/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import React from 'react';
import { Menu, Icon, Badge } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
// import { useSelector } from "react-redux";



export const withRouter = (Component) => {
  const Wrapper = (props) => {
    let navigate = useNavigate();
    const { pathname } = useLocation();
    
    return (
      <Component
      navigate={navigate}
      pathname={pathname}
        {...props}
        />
    );
  };
  
  return Wrapper;
};

function RightMenu(props) {
  // const user = useSelector(state => state.user)
  let test = true;
  console.log(props.pathname)
  let pathName = props.pathname;

  const logoutHandler = () => {
    props.navigate("/login");
    // axios.get(`${USER_SERVER}/logout`).then(response => {
    //   if (response.status === 200) {
    //     props.navigate("/login");
    //   } else {
    //     alert('Log Out Failed')
    //   }
    // });
  };

  // if (user.userData && !user.userData.isAuth) {
  //   return (
  //     <Menu mode={props.mode}>
  //       <Menu.Item key="mail">
  //         <a href="/login">Signin</a>
  //       </Menu.Item>
  //       <Menu.Item key="app">
  //         <a href="/register">Signup</a>
  //       </Menu.Item>
  //     </Menu>
  //   )
  // } else {
    return (
      <Menu mode={props.mode}>
           <Menu.Item key="history">
          {/* <a href="/history" className={test === '/history' ? 'nav-active' : 'dd'}>History</a> */}
          <Link to="/history">ddd</Link>
        </Menu.Item>
        <Menu.Item key="tttt">
          <Link to="/tttt">tttt</Link>
        </Menu.Item>
         <Menu.Item key="upload">
          <a href="/product/upload">Upload</a>
        </Menu.Item>
        <Menu.Item key="cart" style={{paddingBottom:3}}>
        <Badge count={1} style={{marginRight: 10}}>
            <a href="/user/cart" className="head-example" style={{marginRight:-10, color: '#667777'}}>
              <Icon type='shopping-cart' style={{fontSize: 30, marginBottom:3}} />
            </a>
       </Badge>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>


       
      </Menu>
    )
  }
// }

export default withRouter(RightMenu);

