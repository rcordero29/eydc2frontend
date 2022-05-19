import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom"

let URL = 'https://edyc2.herokuapp.com/user/login';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const navigate = useNavigate()

  const handleUser = ()=>{
    navigate('/newuser')
  }


  function handleLogin(e) {
    e.preventDefault();
    setError(false);
    let body = { username, userpassword: password };
    console.log(body, '*****');
    fetch(URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Username or Password is incorrect');
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        document.cookie = `token=${data.token};Max-Age=60*60`
        navigate("/")
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }
  return (
    <div className={'formContainer'} style={{ width: 400, margin: 'auto' }}>
      <form
        className={'form'}
        noValidate
        autoComplete="off"
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 20,
          marginTop: 50,
          gap: 10,
        }}
        onSubmit={handleLogin}
      >
        <TextField
          required
          id="username"
          label="Username"
          type={'text'}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          required
          id="password"
          label="Password"
          type={'password'}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {console.log(username, password)}
        {error && (
          <p style={{ color: 'red' }}>Username or Password is incorrect.</p>
        )}
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
        <Button type="submit" variant="contained" color="primary" onClick={handleUser}>
          Create Account
        </Button>
      </form>
    </div>
  );
}

export default Login;
