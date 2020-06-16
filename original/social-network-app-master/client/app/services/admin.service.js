/*
 * File: admin.service.js
 * Project: social-network-app
 * File Created: Friday, 7th June 2019 2:46:33 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 2:54:47 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */

import config from "../../../config/config";
import { authService } from "./auth.service";

export const adminService = {
  fetchAll,
  createUser,
  updateUser,
  deleteUser
};

async function createUser(fullname, email, password) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + authService.authTokenValue,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ fullname, email, password })
  };

  const updateUserRes = await (await fetch(
    `${config.client.apiUrl}/admin/user/create`,
    requestOptions
  )).json();
  if (updateUserRes.success) {
    return;
  } else {
    throw new Error(updateUserRes.message);
  }
}

async function fetchAll() {
  const requestOptions = {
    method: "GET",
    headers: { Authorization: "Bearer " + authService.authTokenValue }
  };

  const fetchAllRes = await (await fetch(
    `${config.client.apiUrl}/admin/user/fetchAll`,
    requestOptions
  )).json();
  if (fetchAllRes.success) {
    return fetchAllRes.data.users;
  } else {
    throw new Error(fetchAllRes.message);
  }
}

async function updateUser(id, fullname, email) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + authService.authTokenValue,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id, fullname, email })
  };

  const updateUserRes = await (await fetch(
    `${config.client.apiUrl}/admin/user/update`,
    requestOptions
  )).json();
  if (updateUserRes.success) {
    return;
  } else {
    throw new Error(updateUserRes.message);
  }
}

async function deleteUser(id) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + authService.authTokenValue
    },
    body: JSON.stringify({ id })
  };

  const deleteUserRes = await (await fetch(
    `${config.client.apiUrl}/admin/user/delete/` + id,
    requestOptions
  )).json();
  if (deleteUserRes.success) {
    return;
  } else {
    throw new Error(deleteUserRes.message);
  }
}
