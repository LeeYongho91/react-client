import React, {useState} from 'react';
import './LoginPage.css';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch } from "react-redux";


function LoginPage() {

  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
  const [rememberMe, setRememberMe] = useState(rememberMeChecked)

  const handleRememberMe = () => {
    setRememberMe(!rememberMe)
  };

  const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = data => {
    console.log(JSON.stringify(data, null, 2));
  };


    return (
        <>
        <div className='login-content'>
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
        error={errors.email ? true : false}
        helperText={errors.email?.message}
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
        error={errors.password ? true : false}
        helperText={errors.password?.message}
      />
      <button className='signin-btn' onClick={handleSubmit(onSubmit)}>Sign In</button>
      <FormControlLabel  control={<Checkbox defaultChecked color="default" />} label="Remember Me" />
      </div> 
            <div className="or">
                or
            </div>
            <div className="right-login-content">
                <Link to="/signup">Dont' have an account? Sign Up!</Link>
                <button>Sign in with FaceBook</button>
                <button>Sign in with Kakao</button>
                <button>Sign in with Google+</button>
            </div>
        </div>
        </>
    )
}

export default LoginPage
