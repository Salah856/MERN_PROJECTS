import React, { Component } from "react";
import Comment from "../components/Comment";
import toggleOpen from "../decorators/toggleOpen";
import { connect } from "react-redux"; 
import { addComment } from "../actions";
import CommentForm from "../components/CommentForm";

class CommentList extends Component {
  // constructor(props) {
  //   super(props);
  //   console.log("---", this.props);
  // }

  // componentDidMount() {
  //   console.log("---", "mounted", this.refs.toggler);
  // }

  // componentWillUnmount() {
  //   console.log("---", "unmounting");
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.isOpen !== this.props.isOpen;
  // }

  render() {
    const { commentObj, isOpen, toggleOpen, article } = this.props;
    if (!commentObj || !commentObj.length) return <h3>no comments yet</h3>;

    const commentItems = commentObj.map(comment => (
      <li key={comment.id}>
        <Comment comment={comment} />
      </li>
    ));
    const body = isOpen ? (
      <div>
        <ul>{commentItems}</ul>
        <CommentForm articleId={article.id} addComment={addComment} />
      </div>
    ) : null;
    const linkText = isOpen ? "close comments" : "show comments";
    return (
      <div>
        <button onClick={toggleOpen} ref="toggler">
          {linkText}
        </button>
        {body}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  console.log({ props, state });
  return {
    commentObj: props.comments.map(id => state.comments.comments.get(id))
  };
};

export default connect(
  mapStateToProps,
  {}
)(toggleOpen(CommentList));
