import React, { useState } from "react";

import "../styles/ReviewBox.css";

import PropTypes from "prop-types";

const ReviewBox = ({ movieId, reviewUpdate }) => {
  //Yian: The userId should be dynamic? Maybe get the ID of the user in session either through backend or useContext and render that information when 
  //user posts the comment :)
  const defaultReview = { movieId, userId: "melancholyzhong" };
  const [content, setContent] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const review = defaultReview;
    review.content = content;
    try {
      await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });
      setContent("");
      reviewUpdate();
    } catch (err) {
      console.log(err);
    }
  };

  const changeHandler = (content) => {
    setContent(content);
  };

  return (
    <div className="card text-center review-box">
      <div className="card-header">Write a review</div>
      <div className="card-body">
        <form onSubmit={submitHandler}>
          <textarea
            className="form-control"
            id="movie-review"
            rows="4"
            onChange={(e) => {
              changeHandler(e.target.value);
            }}
            value={content}
          ></textarea>
          <button type="submit" className="btn btn-success">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

ReviewBox.propTypes = {
  movieId: PropTypes.string,
  reviewUpdate: PropTypes.func,
};

export default ReviewBox;
