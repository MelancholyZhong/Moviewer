import React, { useState } from "react";

import "../styles/ReviewCard.css";

import PropTypes from "prop-types";
//
const ReviewCard = ({ item, reviewUpdate }) => {
  const [content, setContent] = useState(item.content);
  const [editing, setEditing] = useState(false);

  const editHandler = () => {
    setEditing(true);
  };

  const deleteHandler = async () => {
    try {
      await fetch(`/api/review/${item._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      reviewUpdate();
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/api/review/${item._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });
      reviewUpdate();
      setEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  const changeHandler = (newContent) => {
    setContent(newContent);
  };

  return (
    <div className="card text-center review-card">
      <div className="card-header">{item.userId}</div>
      <div className="card-body">
        {!editing && <p className="card-text">{content}</p>}
        {!editing && (
          <button onClick={editHandler} className="btn btn-primary">
            Edit
          </button>
        )}
        {!editing && (
          <button onClick={deleteHandler} className="btn btn-danger">
            Delete
          </button>
        )}
        {editing && (
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
        )}
      </div>
    </div>
  );
};

ReviewCard.propTypes = {
  item: PropTypes.object,
  reviewUpdate: PropTypes.func,
};

export default ReviewCard;
