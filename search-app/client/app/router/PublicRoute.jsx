/*
 * File: PrivateRoute.jsx
 * Project: search-app
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 2:54:43 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

import React from "react";
import { Route } from "react-router-dom";

export const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return <Component {...props} />;
    }}
  />
);
