/*
 * File: App.jsx
 * Project: blog-app
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 2:54:07 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

import React from "react";
import { Router, Route, Link } from "react-router-dom";

import { history } from "../../helpers";
import { PublicRoute } from "../../router/PublicRoute";
import { authService } from "../../services";
import { HomePage } from "../HomePage";
import { LoginPage } from "../LoginPage";
import { ManagePage } from "../ManagePage";
import { EmailPage } from "../EmailPage";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { CreateBlogPage } from "../CreateBlogPage";
import { PostPage } from "../PostPage";
import "../../../public/assets/css/react-md.css";
import "./App.css";
import { UpdateBlogPage } from "../UpdateBlogPage";

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
        <NavBar />
        <Router history={history}>
          <PublicRoute exact path="/" component={HomePage} />
          <PublicRoute exact path="/login" component={LoginPage} />
          <PublicRoute exact path="/manage" component={ManagePage} />
          <PublicRoute exact path="/blog-create" component={CreateBlogPage} />
          <PublicRoute exact path="/blog-update/:blogId" component={UpdateBlogPage} />
          <PublicRoute exact path="/blog/:blogId" component={PostPage} />
          <PublicRoute exact path="/email-confirmation" component={EmailPage} />
        </Router>
        <hr />
        <Footer />
      </>
    );
  }
}

export { App };
