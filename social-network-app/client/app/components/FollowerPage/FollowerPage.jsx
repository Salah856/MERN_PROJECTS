/*
 * File: FollowerPage.jsx
 * Project: social-network-app
 * File Created: Tuesday, 18th June 2019 2:20:15 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Tuesday, 18th June 2019 2:23:51 am
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */

import React from "react";

import { modalService, followerService } from "../../services";

import { FollowerBox } from "../App/FollowerBox";

import "./FollowerPage.css";

import { history } from "../../helpers";

class FollowerPage extends React.Component {
  isMessageModalOpenedSub;
  constructor(props) {
    super(props);

    this.state = {
      followers: []
    };
  }

  async componentDidMount() {
    const followers = await followerService.fetchFollowers();
    this.setState({
      followers
    });
  }

  render() {
    const { followers } = this.state;

    const items = followers.map(follower => {
      return (
        <div className="row member-row" key={follower._id}>
          <div className="col-md-3">
            <img src={follower.profilePicture} className="img-thumbnail-small" alt="" />
            <div className="text-center">{follower.fullname}</div>
          </div>
          <div className="col-md-3">
            <p>
              <a onClick={() => {
                modalService.openMessageModal(follower._id);
              }} className="btn btn-danger btn-block">
                <i className="fa fa-envelope" /> View Message Box
              </a>
            </p>
          </div>
          <div className="col-md-3">
            <p>
              <a onClick={() => {
                history.push("/profile/" + follower._id);
              }} className="btn btn-primary btn-block">
                <i className="fa fa-edit" /> View Profile
              </a>
            </p>
          </div>
        </div>
      );
    });
    return (
      <>
        <div className="row">
          <div className="col-md-8">
            <div className="members">
              <h1 className="page-header">My Followers</h1>
              {items}
            </div>
          </div>
          <FollowerBox />
        </div>
      </>
    );
  }
}

export { FollowerPage };
