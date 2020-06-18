/*
 * File: App.jsx
 * Project: search-app
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 2:54:07 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

import React from "react";
import { Router } from "react-router-dom";

import { history } from "../../helpers";
import { PublicRoute } from "../../router/PublicRoute";
import { HomePage } from "../HomePage";
import { SearchPage } from "../SearchPage";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
  }

  render() {
    return (
      <>
        <Router history={history}>
          <PublicRoute exact path="/" component={HomePage} />
          <PublicRoute exact path="/search/" component={HomePage} />
          <PublicRoute exact path="/search/:keyword" component={SearchPage} />
        </Router>
      </>
    );
  }
}

export { App };
