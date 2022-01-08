import React from 'react';
import './LoginPage.css';
import TextField from '@mui/material/TextField';

function LoginPage() {
    return (
        <>
        <div className='login-content'>
        <TextField
          error = {false}
          id="outlined-error"
          label="Error"
          defaultValue="Hello World"
        />
        </div>
        </>
    )
}

export default LoginPage
