import React from "react";
import PropTypes from "prop-types";

function Comment(props) {
  if (!props.comment) return <h3>Something</h3>;
  const {
    comment: { text, user }
  } = props;
  return (
    <div>
      <p>{text}</p>
      <b>by {user}</b>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    text: PropTypes.string.isRequired,
    user: PropTypes.string
  })
};

export default Comment;
