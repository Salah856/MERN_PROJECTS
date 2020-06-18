/*
 * File: FollowerBox.jsx
 * Project: social-network-app
 * File Created: Tuesday, 11th June 2019 1:31:37 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Tuesday, 11th June 2019 1:35:29 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */

import React from "react";
import { MDBTooltip, MDBBtn } from "mdbreact";
import { followerService } from "../../../services";
import { history } from "../../../helpers";

class FollowerBox extends React.Component {
  currentUserSub;
  constructor(props) {
    super(props);

    this.state = {
      followers: []
    };
  }

  async componentDidMount() {
    const followers = await followerService.fetchFollowers(9);
    this.setState({ followers });
  }

  render() {
    const { followers } = this.state;
    const items = followers.map((follower, i) => {
      return (
        <ul key={follower._id}>
          <li>
            <MDBTooltip placement="bottom">
              <MDBBtn style={{ paddingRight: "0px", paddingBottom: "1px" }}>
                <a onClick={() => {
                  history.push("/profile/" + follower._id);
                }} className="thumbnail">
                  <img src={follower.profilePicture} alt="" />
                </a>
              </MDBBtn>
              <div>{follower.fullname}</div>
            </MDBTooltip>
          </li>
        </ul>
      );
    });
    return (
      <>
        <div className="col-md-4">
          <div className="panel panel-default followers">
            <div className="panel-heading">
              <h3 className="panel-title">My Followers</h3>
            </div>
            {items}
            <div className="panel-body">
              <div className="clearfix" />
              <a onClick={() => {
                history.push("/followers");
              }} className="btn btn-primary">
                View All Followers
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export { FollowerBox };
