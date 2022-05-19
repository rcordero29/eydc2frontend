import React from "react";
import cookie from "cookie";

const cookies = cookie.parse(document.cookie);

const Thumbsup = ({ biz, reviews }) => {
  const numUps = reviews.reduce((acc, review) => {
    return acc + review.thumbsup;
  }, 0);

  const handleThumbsUp = (e, id) => {
    e.preventDefault();
    fetch(`https://edyc2.herokuapp.com/ratings/thumbsup/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${cookies.token}`
      }
    }).then((response) => {
      window.location.reload()
      console.log(response);
    });
  };

  return (
    <div>
      <svg
        onClick={(e) => handleThumbsUp(e, biz.idbusinesses)}
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: "5rem", width: "5rem", cursor: "pointer" }}
        viewBox="0 0 20 20"
        fill="#04773B"
      >
        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
      </svg>
      <p>{numUps}</p>
    </div>
  );
};

export default Thumbsup;
