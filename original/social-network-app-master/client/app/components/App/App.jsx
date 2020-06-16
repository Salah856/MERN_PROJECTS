/*
 * File: App.jsx
 * Project: social-network-app
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 2:54:07 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
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
import { ProfilePage } from "../ProfilePage";
import { EmailPage } from "../EmailPage";
import { PeoplePage } from "../PeoplePage";
import { FollowerPage } from "../FollowerPage";
import { NavBar } from "./NavBar";
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
    authService.currentUser.subscribe(currentUser => {
      this.setState({ currentUser });
    });
  }

  logout() {
    authService.logout();
    history.push("/login");
  }

  render() {
    const { currentUser } = this.state;
    return (
      <>
        {currentUser && <NavBar />}
        <Router history={history}>
          {currentUser ? (
            <section style={{ paddingTop: "85px" }}>
              <div className="container">
                <PrivateRoute exact path="/" component={HomePage} />
                <PrivateRoute exact path="/followers" component={FollowerPage} />
                <PrivateRoute exact path="/profile/:userId?" component={ProfilePage} />
                <PrivateRoute exact path="/people" component={PeoplePage} />
              </div>
            </section>
          ) : (
            <Route exact path="/login" path="" component={LoginPage} />
          )}
          <PrivateRoute exact path="/email-confirmation" component={EmailPage} />
        </Router>
      </>
    );
  }
}

export { App };
