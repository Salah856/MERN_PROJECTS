/*
 * File: ProfilePage.jsx
 * Project: social-network-app
 * File Created: Thursday, 6th June 2019 1:56:55 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 2:54:34 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */

import React from "react";

import {
  authService,
  modalService,
  userService,
  feedService
} from "../../services";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import { FollowerBox } from "../App/FollowerBox";

class ProfilePage extends React.Component {
  userSub;
  isProfileModalOpenedSub;
  constructor(props) {
    super(props);

    this.fetchFeeds = this.fetchFeeds.bind(this);
    this.handlePostChange = this.handlePostChange.bind(this);

    this.state = {
      user: authService.currentUserValue,
      isMe: false,
      feeds: [],
      feedValue: "",
      formValues: {
        feedCommentValue: ""
      }
    };
  }

  async componentDidMount() {
    const userId = this.props.match.params.userId;
    if (userId && userId !== authService.currentUserValue._id) {
      const user = await userService.fetchUser(userId);
      this.setState({ user, isMe: false });
    } else {
      this.userSub = authService.currentUser.subscribe(currentUser =>
        this.setState({ user: currentUser, isMe: true })
      );
      this.isProfileModalOpenedSub = modalService.isProfileModalOpened.subscribe(
        async modal => {
          await authService.verifyUser();
        }
      );
      await this.fetchFeeds();
    }
  }

  async fetchFeeds() {
    const feeds = await feedService.fetchFeeds();
    this.setState({
      feeds
    });
  }

  handlePostChange(value) {
    this.setState({ feedValue: value });
  }

  componentWillUnmount() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
    if (this.userSub) {
      this.isProfileModalOpenedSub.unsubscribe();
    }
  }

  componentDidUpdate = prevProps => {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.componentDidMount();
    }
  };

  render() {
    const { user, isMe, feeds, feedValue, formValues } = this.state;

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
                <a className="post-avatar thumbnail">
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
            <div className="profile">
              <h1 className="page-header">
                {user.fullname}{" "}
                {isMe && (
                  <a
                    onClick={() => {
                      modalService.openProfileModal();
                    }}
                  >
                    <span className="fa fa-edit" style={{ color: "blue" }} />
                  </a>
                )}
              </h1>
              <div className="row">
                <div className="col-md-4">
                  <img
                    src={user.profilePicture}
                    className="img-thumbnail"
                    alt=""
                  />
                </div>
                <div className="col-md-8">
                  <ul>
                    <li>
                      <strong>Name:</strong> {user.fullname}
                    </li>
                    <li>
                      <strong>Email:</strong> {user.email}
                    </li>
                  </ul>
                </div>
              </div>
              <br />
              <br />
              {isMe && (
                <div className="row">
                  <div className="col-md-12">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h3 className="panel-title">Profile Wall</h3>
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
                </div>
              )}
            </div>
          </div>
          <FollowerBox />
        </div>
      </>
    );
  }
}

export { ProfilePage };
