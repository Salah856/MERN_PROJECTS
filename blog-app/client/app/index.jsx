/*
 * File: index.jsx
 * Project: blog-app
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Wednesday, 5th June 2019 12:49:53 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

import React from "react";
import { render } from "react-dom";

import { App } from "./components/App";
import { Modal } from "./components/App/Modal";

render(
  <>
    <App />
    <Modal />
  </>,
  document.getElementById("app")
);
