import React, { useState } from 'react';
import './LoginPage.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch } from 'react-redux';
import userActions from '../../../_actions/user_actions';

function LoginPage(props) {
  const dispatch = useDispatch();
  const rememberMeChecked = !!localStorage.getItem('rememberMe');
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);
  const [formErrorMessage, setFormErrorMessage] = useState('');

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
    formState: { errors },
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
      const res = await dispatch(userActions.loginUser(dataToSubmit));
      if (res.payload.loginSuccess) {
        window.localStorage.setItem('userId', res.payload.userId);
        if (rememberMe === true) {
          window.localStorage.setItem('rememberMe', data.email);
        } else {
          localStorage.removeItem('rememberMe');
        }
        props.history.push('/');
      } else {
        setFormErrorMessage('Check out your Account or Password again');
      }
    } catch (error) {
      console.log(error.message);
      setFormErrorMessage('Check out your Account or Password again');
      console.log(formErrorMessage);
    }
  };

  return (
    <>
      <div className="login-content">
        <div className="left-login-content">
          <h2>Login Into Your Account</h2>
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
          />
          <button className="signin-btn" onClick={handleSubmit(onSubmit)}>
            Sign In
          </button>
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
          <button>Sign in with FaceBook</button>
          <button>Sign in with Kakao</button>
          <button>Sign in with Google+</button>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
