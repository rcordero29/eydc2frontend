import React from "react";
// require ('dotenv').config

const Map = ({address}) => {
  let addressParam = address.toString().split(' ').join('+')
  // let addressParam = address
  let apiKey = process.env.REACT_APP_G_KEY


  if ( address === ''){
    return null }
    else {
      return (
        <div className="map">
          <iframe
          title="map"
          width='450'
          height='350'
          frameBorder='0'
          src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${addressParam}`}
          allowFullScreen></iframe>
        </div>
      )
    }
  }

  export default Map