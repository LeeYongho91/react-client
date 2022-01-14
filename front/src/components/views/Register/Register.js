import React, { useEffect } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { registerUser } from '../../../_actions/user_actions';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('이메일은 필수입니다.')
      .email('이메일 양식을 확인해주세요.'),
    password: Yup.string()
      .required('비밀번호는 필수입니다.')
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/,
        '비밀번호는 8 ~ 12자 이며, 숫자/영문/특수문자를 모두 포함해야 합니다.',
      ),
    name: Yup.string().required('이름은 필수입니다,'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], '비밀번호가 다릅니다.')
      .required('비밀번호 확인은 필수입니다.'),
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
        name: data.name,
        password: data.password,
        image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
      };
      const res = await dispatch(registerUser(dataToSubmit));
      if (res.payload.success) {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log(navigate);
  });
  return (
    <>
      <div className="register-content">
        <h2>Sign up</h2>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          required
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          id="confirmPassword"
          label="Password Confirm"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          required
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
        <button
          disabled={!isValid}
          className="signup-btn"
          onClick={handleSubmit(onSubmit)}
        >
          sign up
        </button>
      </div>
    </>
  );
}

export default Register;
