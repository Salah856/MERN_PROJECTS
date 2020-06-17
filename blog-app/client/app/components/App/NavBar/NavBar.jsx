/*
 * File: NavBar.jsx
 * Project: blog-app
 * File Created: Tuesday, 11th June 2019 1:31:37 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Tuesday, 11th June 2019 1:35:29 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

import React from "react";

import { history } from "../../../helpers";
import { authService } from "../../../services";
import "../../../../public/assets/js/app.js";

class NavBar extends React.Component {
  currentUserSub;
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }

  async componentDidMount() {
    const authToken = await authService.authTokenValue;
    if (authToken) {
      await authService.verifyUser();
    }
    this.currentUserSub = authService.currentUser.subscribe(currentUser =>
      this.setState({ currentUser })
    );
  }

  componentWillUnmount() {
    this.currentUserSub.unsubscribe();
  }

  logout() {
    authService.logout();
    history.push("/login");
  }

  render() {
    const { currentUser } = this.state;
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light fixed-top"
        id="mainNav"
      >
        <div className="container">
          <a
            className="navbar-brand"
            onClick={() => {
              history.push("/");
            }}
            href="javascript:void(0)"
          >
            Eduonix Blog
          </a>
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i className="fas fa-bars" />
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() => {
                    history.push("/");
                  }}
                  href="javascript:void(0)"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() => {
                    history.push("/manage");
                  }}
                  href="javascript:void(0)"
                >
                  Manage
                </a>
              </li>
              {!currentUser && (
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => {
                      history.push("/login");
                    }}
                    href="javascript:void(0)"
                  >
                    Login
                  </a>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={async () => {
                      await authService.logout();
                      history.push("/login");
                    }}
                    href="javascript:void(0)"
                  >
                    Logout
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export { NavBar };
