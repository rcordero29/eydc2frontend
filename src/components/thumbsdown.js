import React from "react";
import cookie from "cookie";

const cookies = cookie.parse(document.cookie);
const Thumbsdown = ({ biz, reviews }) => {
  const numDowns = reviews.reduce((acc, review) => {
    return acc + review.thumbsdown;
  }, 0);

  const handleThumbsDown = (e, id) => {
    e.preventDefault();
    fetch(`https://edyc2.herokuapp.com/ratings/thumbsdown/${id}`, {
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
        onClick={(e) => handleThumbsDown(e, biz.idbusinesses)}
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: "5rem", width: "5rem", cursor: "pointer" }}
        viewBox="0 0 20 20"
        fill="#F9564F"
      >
        <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />{" "}
      </svg>
      <p>{numDowns}</p>
    </div>
  );
};

export default Thumbsdown;
 