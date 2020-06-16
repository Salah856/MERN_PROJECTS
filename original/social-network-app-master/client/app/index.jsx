/*
 * File: index.jsx
 * Project: social-network-app
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Wednesday, 5th June 2019 12:49:53 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */

import React from "react";
import { render } from "react-dom";

import { App } from "./components/App";
import { UserCreateModalPage } from "./components/HomePage/UserCreateModalPage";
import { UserUpdateModalPage } from "./components/HomePage/UserUpdateModalPage";
import { ProfileModalPage } from "./components/ProfilePage/ProfileModalPage";
import { MessageModal } from "./components/FollowerPage/MessageModal";
import { Modal } from "./components/App/Modal";

render(
  <>
    <App />
    <UserCreateModalPage />
    <UserUpdateModalPage />
    <ProfileModalPage />
    <MessageModal />
    <Modal />
  </>,
  document.getElementById("app")
);
