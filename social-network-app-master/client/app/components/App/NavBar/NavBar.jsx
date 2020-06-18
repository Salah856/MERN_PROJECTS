/*
 * File: NavBar.jsx
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

import { history } from "../../../helpers";
import { authService } from "../../../services";

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
      <>
        {currentUser && (
          <nav
            className="navbar navbar-expand"
            style={{
              backgroundImage: "linear-gradient(#04519b, #044687 60%, #033769)",
              color: "#fff",
              borderRadius: "0px",
              position: "fixed",
              top: "0px",
              width: "100%",
              zIndex: "99"
            }}
          >
            <div className="container">
              <img
                onClick={() => {
                  history.push("/");
                }}
                src={"./assets/img/eduonix-logo-light.png"}
                style={{
                  height: "2rem",
                  position: "relative",
                  top: "-0.15rem",
                  width: "auto"
                }}
              />
              <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a
                      onClick={() => {
                        history.push("/");
                      }}
                      className="nav-item nav-link"
                    >
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      onClick={() => {
                        history.push("/people");
                      }}
                      className="nav-item nav-link"
                    >
                      People
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      onClick={() => {
                        history.push("/followers");
                      }}
                      className="nav-item nav-link"
                    >
                      Followers
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      onClick={() => {
                        history.push("/profile");
                      }}
                      className="nav-item nav-link"
                    >
                      Profile
                    </a>
                  </li>
                  <li className="nav-item">
                    <a onClick={this.logout} className="nav-item nav-link">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )}
      </>
    );
  }
}

export { NavBar };
