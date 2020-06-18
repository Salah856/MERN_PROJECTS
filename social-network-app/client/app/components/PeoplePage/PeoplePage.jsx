/*
 * File: PeoplePage.jsx
 * Project: social-network-app
 * File Created: Wednesday, 12th June 2019 1:38:03 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Wednesday, 12th June 2019 1:38:36 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */

import React from "react";
import { MDBCol } from "mdbreact";
import { peopleService, followerService } from "../../services";
import { FollowerBox } from "../App/FollowerBox";
import { history } from "../../helpers";

class PeoplePage extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeywordChange = this.handleKeywordChange.bind(this);

    this.state = {
      people: [],
      keywordValue: ""
    };
  }

  async componentDidMount() {
    const people = await peopleService.fetchAll();
    this.setState({
      people
    });
  }

  handleKeywordChange(value) {
    this.setState({ keywordValue: value });
  }

  async searchPeople(keyword) {
    const people = await peopleService.searchPeople(keyword);
    this.setState({
      people
    });
  }

  render() {
    const { people, keywordValue } = this.state;
    const items = people.map((_people, i) => {
      return (
        <div className="row member-row" key={_people._id}>
          <div className="col-md-3">
            <img
              src={_people.profilePicture}
              className="img-thumbnail-small"
              alt=""
            />
            <div className="text-center">{_people.fullname}</div>
          </div>
          <div className="col-md-3">
            <p>
              <a
                onClick={async () => {
                  if (_people.isFollower) {
                    people[i].isFollower = false;
                    +this.setState({
                      people
                    });
                    await followerService.removeFollower(_people._id);
                  } else {
                    people[i].isFollower = true;
                    this.setState({
                      people
                    });
                    await followerService.addFollower(_people._id);
                  }
                }}
                className="btn btn-success btn-block"
              >
                <i className="fa fa-users" />{" "}
                {_people.isFollower ? "Unfollow" : "Follow"}
              </a>
            </p>
          </div>
          <div className="col-md-3">
            <p>
              <a onClick={() => {
                history.push("/profile/" + _people._id);
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
              <h1 className="page-header">
                <div className="input-group">
                  <MDBCol md="8">
                    <span>People</span>
                  </MDBCol>
                  <MDBCol md="3" style={{ padding: "0px" }}>
                    <input
                      value={keywordValue}
                      onChange={event => {
                        this.handleKeywordChange(event.target.value);
                      }}
                      className="form-control"
                      type="text"
                      placeholder="Search"
                      aria-label="Search"
                      style={{
                        height: "45px",
                        float: "right",
                        marginRight: "-27px"
                      }}
                    />
                  </MDBCol>
                  <MDBCol md="1" style={{ padding: "0px" }}>
                    <span className="input-group-btn">
                      <button
                        onClick={async () => {
                          await this.searchPeople(keywordValue);
                        }}
                        className="btn btn-primary"
                        type="button"
                        style={{ height: "45px", float: "right" }}
                      >
                        <i className="fa fa-search" />
                      </button>
                    </span>
                  </MDBCol>
                </div>
              </h1>
              {items}
            </div>
          </div>
          <FollowerBox />
        </div>
      </>
    );
  }
}

export { PeoplePage };
