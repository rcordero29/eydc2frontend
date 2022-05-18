import * as React from 'react';
import Map from './maps';
import { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/system';
import cookie from 'cookie';

import { createTheme } from '@mui/material';


const cookies = cookie.parse(document.cookie);


const businessReview = (arr, prop)=> {
  return arr.reduce(function(acc,item){
    let key = item[prop]
    if (!acc[key]){
      acc[key] = []
    }
    acc[key].push(item)
    return acc
  },{})
}

let currentBusiness = businessReview(biz, 'businessid')

const Business = () => {
  const [businesses, setBusinesses] = useState([]);
  const [reviews, setReviews] = useState([]);


  const theme = createTheme({
    typography: {
      fontFamily: ['Nunito', 'sans-serif'].join(','),
    },
  });

  useEffect(() => {
    fetch('https://edyc2.herokuapp.com/businesses')
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setBusinesses(data);
      });
  }, []);
  useEffect(() => {
    fetch('https://edyc2.herokuapp.com/ratings/reviews')
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setReviews(data);
      });
  }, []);
  console.log(reviews);


  const handleThumbsUp = (e, id) => {
    e.preventDefault();
    fetch(`https://edyc2.herokuapp.com/ratings/thumbsup/${id}`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${cookies.token}`,
      },
    }).then((response) => {
      console.log(response);
    });
  };

  const handleThumbsDown = (e, id) => {
    e.preventDefault();
    fetch(`https://edyc2.herokuapp.com/ratings/thumbsdown/${id}`, { 
      method: 'POST',
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
    <ThemeProvider theme={theme}>
      <div className={'gridContainer'}>
        {businesses.map((biz, i) => (
          <div className='biz' key={biz.idbusinesses}>
            <p style={{width: 200, textAlign: 'left'}}>{biz.businessname}</p>
            <p>{biz.address}</p>
            <Map address={biz.address}/>
            <p>{biz.phonenumber}</p>
            {console.log(biz)}

            <svg
              onClick={(e) => handleThumbsUp(e, biz.idbusinesses)}
              xmlns="http://www.w3.org/2000/svg"
              style={{ height: '5rem', width: '5rem', cursor: 'pointer' }}
              viewBox="0 0 20 20"
              fill="#04773B"
            >
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            <p>{reviews.reduce()}</p>
            <svg
              onClick={(e) => handleThumbsDown(e, biz.idbusinesses)}
              xmlns="http://www.w3.org/2000/svg"
              style={{ height: '5rem', width: '5rem', cursor: 'pointer' }}
              viewBox="0 0 20 20"
              fill="#F9564F"
            >
              <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />{' '}
            </svg>
          </div>
        ))}
      </div>
    </ThemeProvider>
  );
};

export default Business;
