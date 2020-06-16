/*
 * File: people.service.js
 * Project: social-network-app
 * File Created: Wednesday, 12th June 2019 1:55:00 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Wednesday, 12th June 2019 2:00:59 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */

import config from "../../../config/config";
import { authService } from "./auth.service";

export const followerService = {
  addFollower,
  removeFollower,
  fetchFollowers
};

async function addFollower(followerId) {
  const requestOptions = {
    method: "POST",
    headers: { "Authorization": "Bearer " +  authService.authTokenValue, "Content-Type": "application/json"},
    body: JSON.stringify({ followerId })
  };

  const addFollowerRes = await (await fetch(
    `${config.client.apiUrl}/user/follower`,
    requestOptions
  )).json();
  if (addFollowerRes.success) {
    return addFollowerRes.message;
  } else {
    throw new Error(addFollowerRes.message);
  }
}

async function removeFollower(followerId) {
  const requestOptions = {
    method: "DELETE",
    headers: { "Authorization": "Bearer " +  authService.authTokenValue, "Content-Type": "application/json"},
    body: JSON.stringify({ followerId })
  };

  const addFollowerRes = await (await fetch(
    `${config.client.apiUrl}/user/follower`,
    requestOptions
  )).json();
  if (addFollowerRes.success) {
    return addFollowerRes.message;
  } else {
    throw new Error(addFollowerRes.message);
  }
}

async function fetchFollowers(limit) {
  const requestOptions = {
    method: "POST",
    headers: { "Authorization": "Bearer " +  authService.authTokenValue, "Content-Type": "application/json"},
    body: JSON.stringify({ limit })
  };

  const fetchFollowerRes = await (await fetch(
    `${config.client.apiUrl}/user/follower/fetch`,
    requestOptions
  )).json();
  if (fetchFollowerRes.success) {
    return fetchFollowerRes.data.followers;
  } else {
    throw new Error(fetchFollowerRes.message);
  }
}
