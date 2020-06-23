import React, { Component } from "react";
import PropTypes from "prop-types";

class CommentForm extends Component {
    static propTypes = {
        addComment: PropTypes.func.isRequired,
        articleId: PropTypes.string.isRequired
    };

    state = {
        user: "",
        text: ""
    };

    handleSubmit = e => {
        const { addComment, articleId } = this.props;
        e.preventDefault();
        addComment(this.state, articleId);
        this.setState({
            user: "",
            text: ""
        });
    };

    render() {
        const { text, user } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Comment:</label>
                <input
                    value={text}
                    onChange={e => this.setState({ text: e.target.value })}
                />
                <label>By:</label>
                <input
                    value={user}
                    onChange={e => this.setState({ user: e.target.value })}
                />
                <button type="submit">Add comment</button>
            </form>
        );
    }
}

export default CommentForm;
