/*
 * File: PrivateRoute.jsx
 * Project: social-network-app
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 2:54:43 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */

import React from "react";
import { Route, Redirect } from "react-router-dom";

import { authService } from "../services";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const currentUser = authService.currentUserValue;
      if (!currentUser) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      } else if (!currentUser.emailVerified) {
        if (props.location.pathname !== "/email-confirmation") {
          return (
            <Redirect
              to={{ pathname: "/email-confirmation", state: { from: props.location } }}
            />
          );
        }
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);
