import * as React from 'react';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import cookie from 'cookie';

let URL = 'https://edyc2.herokuapp.com/user/newuser';

const cookies = cookie.parse(document.cookie);

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [userpassword, setUserPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!cookies.token) {
  //     navigate('/login');
  //   }
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let body = { username, userpassword, email, firstname, lastname };
    console.log(body);
    fetch(URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${cookies.token}`,
      },
    }).then((response) => {
      console.log(response);
    });
  };

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
        onSubmit={handleSubmit}
      >
        {console.log(cookies)}
        <TextField
          required
          id="Username"
          label="Username"
          type={'text'}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          required
          id="Password"
          label="Password"
          type={'password'}
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
        />
        <TextField
          required
          id="Email"
          label="Email"
          type={'text'}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          required
          id="First Name"
          label="First Name"
          type={'text'}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <TextField
          required
          id="Last Name"
          label="Last Name"
          type={'text'}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        {console.log(username, userpassword, email, firstname, lastname)}
        {/* {error && (
          <p style={{ color: 'red' }}>Username or Password is incorrect.</p>
        )} */}
        <Button type="submit" variant="contained" color="primary">
          submit
        </Button>
      </form>
    </div>
  );
};

export default AddUser;
