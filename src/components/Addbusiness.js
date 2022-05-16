import * as React from 'react';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import cookie from 'cookie';

let URL = 'https://edyc2.herokuapp.com/businesses/create';

const cookies = cookie.parse(document.cookie);

const AddBusiness = () => {
  const [address, setAddress] = useState('');
  const [businessname, setBusinessName] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.token) {
      navigate('/login');
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let body = { businessname, address, phonenumber };
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
          id="address"
          label="address"
          type={'text'}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <TextField
          required
          id="businessname"
          label="businessname"
          type={'text'}
          onChange={(e) => {
            setBusinessName(e.target.value);
          }}
        />
        <TextField
          required
          id="phonenumber"
          label="phonenumber"
          type={'text'}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
        {console.log(businessname, address, phonenumber)}
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

export default AddBusiness;
