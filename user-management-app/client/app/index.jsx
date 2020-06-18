/*
 * File: index.jsx
 * Project: user-management
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Wednesday, 5th June 2019 12:49:53 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com>)
 * -----
 * Copyright 2019, ADDLC
 */

import React from "react";
import { render } from "react-dom";

import { App } from "./components/App";
import { Footer } from "./components/Footer";
import { UserCreateModalPage } from "./components/HomePage/UserCreateModalPage";
import { UserUpdateModalPage } from "./components/HomePage/UserUpdateModalPage";
import config from "../../config/config";

import { setMockBackend } from "./helpers/mock-backend";
if (config.client.mock) {
  setMockBackend();
}

render(
  <>
    <App />
    <UserCreateModalPage />
    <UserUpdateModalPage />
    <Footer />
  </>,
  document.getElementById("app")
);
