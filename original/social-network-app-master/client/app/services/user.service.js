/*
 * File: user.service.js
 * Project: social-network-app
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 2:55:00 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */

import config from "../../../config/config";
import { authService } from "./auth.service";

export const userService = {
  updateUser,
  fetchUser
};

async function updateUser(fullname, email, profilePicture) {
  const body = {
    fullname,
    email,
    profilePicture
  }
  if (email === authService.currentUserValue.email) {
    delete body.email;
  }
  const requestOptions = {
    method: "POST",
    headers: { "Authorization": "Bearer " +  authService.authTokenValue, "Content-Type": "application/json"},
    body: JSON.stringify(body)
  };

  const updateUserRes = await (await fetch(`${config.client.apiUrl}/user/update`, requestOptions)).json();
  if (updateUserRes.success) {
    localStorage.setItem("currentUser", JSON.stringify(updateUserRes.data.user));
    authService.currentUserSubject.next(updateUserRes.data.user);
    return updateUserRes.data.user;
  } else {
    throw new Error(updateUserRes.message);
  }
}

async function fetchUser(userId) {
  const requestOptions = {
    method: "POST",
    headers: { "Authorization": "Bearer " +  authService.authTokenValue, "Content-Type": "application/json"},
    body: JSON.stringify({ userId })
  };

  const fetchUserRes = await (await fetch(`${config.client.apiUrl}/user/fetch`, requestOptions)).json();
  if (fetchUserRes.success) {
    return fetchUserRes.data.user;
  } else {
    throw new Error(fetchUserRes.message);
  }
}