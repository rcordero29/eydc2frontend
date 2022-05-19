import * as React from 'react';
import Map from './maps';
import { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/system';
import cookie from 'cookie';
import Thumbsdown from './thumbsdown';
import Thumbsup from './thumbsup';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { createTheme } from '@mui/material';

function createData(businessname,busineessAddress, phonenumber) {
  return { businessname,busineessAddress, phonenumber};
}

const cookies = cookie.parse(document.cookie);

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


  const getFilteredReviews = (id) => {
    const filtered = reviews.filter(function (review) {
      return review.businessid === id;
    });
    return filtered;
  };


  return (
    <ThemeProvider theme={theme}>
      <div className={'gridContainer'}>
        {businesses.map((biz, i) => (
          <div className="biz" key={biz.idbusinesses}>
            <p style={{ width: 200, textAlign: 'left' }}>{biz.businessname}</p>
            <p>{biz.address}</p>
            <Map address={biz.address} />
            <p>{biz.phonenumber}</p>
            {console.log(biz)}
            <Thumbsup
              biz={biz}
              reviews={getFilteredReviews(biz.idbusinesses)}
            />

            <Thumbsdown
              biz={biz}
              reviews={getFilteredReviews(biz.idbusinesses)}
            />

          </div>
        ))}
      </div>
    </ThemeProvider>
  );
};

export default Business;
