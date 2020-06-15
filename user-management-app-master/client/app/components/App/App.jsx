/*
 * File: App.jsx
 * Project: user-management
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 2:54:07 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com>)
 * -----
 * Copyright 2019, ADDLC
 */

import React from "react";
import { Router, Route, Link } from "react-router-dom";

import { history } from "../../helpers";
import { authService } from "../../services";
import { PrivateRoute } from "../../router";
import { HomePage } from "../HomePage";
import { LoginPage } from "../LoginPage";
import { RegisterPage } from "../RegisterPage";
import { ProfilePage } from "../ProfilePage";
import { EmailPage } from "../EmailPage";
import "./App.css";

class App extends React.Component {
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
    authService.currentUser.subscribe(currentUser =>
      this.setState({ currentUser })
    );
  }

  logout() {
    authService.logout();
    history.push("/login");
  }

  render() {
    const { currentUser } = this.state;
    return (
      <Router history={history}>
        <div>
          {currentUser && (
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <Link to="/" className="navbar-brand">
                <img
                  src={"./assets/img/eduonix-logo-light.png"}
                  style={{
                    height: "1.5rem",
                    position: "relative",
                    top: "-0.15rem",
                    width: "auto"
                  }}
                />
              </Link>
              <div className="navbar-nav">
                {currentUser.role === "admin" && (
                  <Link to="/" className="nav-item nav-link">
                    Home
                  </Link>
                )}
                <Link to="/profile" className="nav-item nav-link">
                  Profile
                </Link>
                <a onClick={this.logout} className="nav-item nav-link">
                  Logout
                </a>
              </div>
            </nav>
          )}
          <div className="jumbotron">
            <div className="container">
              <div className="row">
                <div className="col-md-8 offset-md-2">
                  <PrivateRoute exact path="/" component={HomePage} />
                  <PrivateRoute path="/profile" component={ProfilePage} />
                  <PrivateRoute
                    path="/email-confirmation"
                    component={EmailPage}
                  />
                  <Route path="/login" component={LoginPage} />
                  <Route path="/register" component={RegisterPage} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export { App };
