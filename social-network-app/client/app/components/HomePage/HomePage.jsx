/*
 * File: HomePage.jsx
 * Project: social-network-app
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 2:54:25 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */

import React from "react";

import { feedService } from "../../services";
import { Formik, Field, Form } from "formik";
import "../../../public/assets/css/bootstrap-3.css";
import * as Yup from "yup";
import { FollowerBox } from "../App/FollowerBox";
import { history } from "../../helpers";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.fetchFeeds = this.fetchFeeds.bind(this);
    this.handlePostChange = this.handlePostChange.bind(this);

    this.state = {
      feedValue: "",
      feeds: [],
      formValues: {
        feedCommentValue: ""
      }
    };
  }

  async componentDidMount() {
    await this.fetchFeeds();
  }

  async fetchFeeds() {
    const feeds = await feedService.fetchFeeds(true);
    this.setState({
      feeds
    });
  }

  handlePostChange(value) {
    this.setState({ feedValue: value });
  }

  render() {
    const { feedValue, feeds, formValues } = this.state;

    const feedItems = feeds.map((feed, i) => {
      const commentItems = feed.comments.map((comment, i) => {
        if (Object.keys(comment).length === 0) {
          return;
        } else {
          return (
            <div key={comment._id} className="comment">
              <a className="comment-avatar pull-left">
                <img src={comment.user.profilePicture} alt="" />
              </a>
              <div className="comment-text">
                <p>{comment.comment}</p>
              </div>
            </div>
          );
        }
      });
      return (
        <div className="panel panel-default post" key={feed._id}>
          <div className="panel-body">
            <div className="row">
              <div className="col-sm-2">
                <a onClick={() => {
                  history.push("/profile/" + feed.user._id);
                }} className="post-avatar thumbnail">
                  <img src={feed.user.profilePicture} alt="" />
                  <div className="text-center">{feed.user.fullname}</div>
                </a>
              </div>
              <div className="col-sm-10">
                <div className="bubble">
                  <div className="pointer">
                    <p>{feed.feed}</p>
                  </div>
                  <div className="pointer-border" />
                </div>
                <div className="comment-form">
                  <Formik
                    initialValues={formValues}
                    validationSchema={Yup.object().shape({
                      feedCommentValue: Yup.string().required("Required")
                    })}
                    onSubmit={(
                      values,
                      { setSubmitting, setErrors, setStatus, resetForm }
                    ) => {
                      const feedCommentValue = values.feedCommentValue.trim();
                      feedService.postFeedComment(feed._id, feedCommentValue);
                      this.fetchFeeds();
                      resetForm(formValues);
                    }}
                    render={() => (
                      <Form className="form-inline">
                        <div className="form-group">
                          <Field
                            name="feedCommentValue"
                            type="text"
                            className="form-control"
                            placeholder="Write comment"
                          />
                        </div>
                        &nbsp;
                        <button type="submit" className="btn btn-primary">
                          Comment
                        </button>
                      </Form>
                    )}
                  />
                </div>
                <div className="clearfix" />

                {Object.keys(feed) !== 0 && (
                  <div className="comments">{commentItems}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    });
    return (
      <>
        <div className="row">
          <div className="col-md-8">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Wall</h3>
              </div>
              <div className="panel-body">
                <form>
                  <div className="form-group">
                    <textarea
                      value={feedValue}
                      onChange={event => {
                        this.handlePostChange(event.target.value);
                      }}
                      className="form-control"
                      placeholder="Write on the wall"
                    />
                  </div>
                  <button
                    onClick={async () => {
                      {
                        (() => {
                          this.handlePostChange("");
                        })();
                      }
                      await feedService.postFeed(feedValue);
                      await this.fetchFeeds();
                    }}
                    type="button"
                    className="btn btn-primary"
                  >
                    Post
                  </button>
                </form>
              </div>
            </div>
            {feedItems}
          </div>
          <FollowerBox />
        </div>
      </>
    );
  }
}

export { HomePage };
