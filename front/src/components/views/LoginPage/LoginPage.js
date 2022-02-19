import React, { useState } from 'react';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_actions';
import { loadingToggleAction } from '../../../_actions/util_actions';

function LoginPage() {
  const dispatch = useDispatch();
  const rememberMeChecked = !!localStorage.getItem('rememberMe');
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);
  const [formErrorMessage, setFormErrorMessage] = useState('');
  const navigate = useNavigate();
  // const location = location.href;

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const initialEmail = localStorage.getItem('rememberMe')
    ? localStorage.getItem('rememberMe')
    : '';

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(12, 'Password must not exceed 12 characters'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit = async data => {
    try {
      const dataToSubmit = {
        email: data.email,
        password: data.password,
      };
      dispatch(loadingToggleAction(true));
      const res = await dispatch(loginUser(dataToSubmit));
      if (res.payload.loginSuccess) {
        window.localStorage.setItem('userId', res.payload.userId);
        if (rememberMe === true) {
          window.localStorage.setItem('rememberMe', data.email);
        } else {
          localStorage.removeItem('rememberMe');
        }
        dispatch(loadingToggleAction(false));
        navigate('/');
      } else {
        setFormErrorMessage('Check out your Account or Password again');
      }
    } catch (error) {
      console.log(error.response.data.message);
      setFormErrorMessage('Check out your Account or Password again');
      console.log(formErrorMessage);
    }
  };

  const snsLogin = async loginType => {
    try {
      dispatch(loadingToggleAction(true));
      window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/${loginType}`;
      dispatch(loadingToggleAction(false));
    } catch (error) {
      // 에러 핸들링할 코드
      console.log(error.response.data);
    }
  };

  return (
    <>
      <div className="login-content">
        <div className="left-login-content">
          <h2>Login Into Your Account</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              className="login-email"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              margin="normal"
              fullWidth
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              // onChange={handleChange}
              placeholder="Enter your email"
              defaultValue={initialEmail}
            />
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              className="login-password"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              margin="normal"
              fullWidth
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              // onChange={handleChange}
              placeholder="Enter your password"
              type="password"
            />
            <button className="signin-btn" type="submit" disabled={!isValid}>
              Sign In
            </button>
          </form>
          <FormControlLabel
            control={
              <Checkbox
                color="default"
                id="rememberMe"
                onChange={handleRememberMe}
                checked={rememberMe}
              />
            }
            label="Remember Me"
          />
        </div>
        <div className="or">or</div>
        <div className="right-login-content">
          <Link to="/signup">Don&apos;t have an account? Sign Up!</Link>
          <button onClick={() => snsLogin('naver')}>Sign in with Naver</button>
          <button onClick={() => snsLogin('kakao')}>Sign in with Kakao</button>
          <button onClick={() => snsLogin('google')}>
            Sign in with Google+
          </button>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
