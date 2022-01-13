import React, { useEffect } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(navigate);
  });
  return (
    <>
      <div className="register-content">content</div>
    </>
  );
}

export default Register;
