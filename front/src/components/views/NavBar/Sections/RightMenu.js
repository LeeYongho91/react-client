/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import React from 'react';
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

  };

    return (
      <></>
    )
  }
// }

export default withRouter(RightMenu);

