/*
 * File: auth.service.js
 * Project: social-network-app
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 2:57:02 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */

import { BehaviorSubject } from "rxjs";

import config from "../../../config/config";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

const authTokenSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("authToken"))
);

export const authService = {
  login,
  register,
  logout,
  verifyUser,
  verifyEmail,
  checkIfEmailVerified,
  currentUserSubject,
  authTokenSubject,
  currentUser: currentUserSubject.asObservable(),
  authToken: authTokenSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
  get authTokenValue() {
    return authTokenSubject.value;
  }
};

function checkIfEmailVerified() {
  if (authService.currentUserValue.emailVerified) {
    return true;
  }
  return false;
}

async function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  };

  const loginRes = await (await fetch(`${config.client.apiUrl}/auth/login`, requestOptions)).json();
  if (loginRes.success) {
    localStorage.setItem("currentUser", JSON.stringify(loginRes.data.user));
    localStorage.setItem("authToken", JSON.stringify(loginRes.data.token));
    authTokenSubject.next(loginRes.data.token);
    currentUserSubject.next(loginRes.data.user);
    return loginRes.data.user;
  } else {
    throw new Error(loginRes.message);
  }
}

async function register(fullname, email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullname, email, password })
  };

  const registerRes = await (await fetch(`${config.client.apiUrl}/auth/register`, requestOptions)).json();
  if (registerRes.success) {
    return;
  } else {
    throw new Error(registerRes.message);
  }
}

async function verifyUser() {
  const requestOptions = {
    method: "GET",
    headers: { "Authorization": "Bearer " +  this.authTokenValue}
  };

  const verifyUserRes = await (await fetch(`${config.client.apiUrl}/auth/verify`, requestOptions)).json();
  if (verifyUserRes.success) {
    localStorage.setItem("currentUser", JSON.stringify(verifyUserRes.data.user));
    currentUserSubject.next(verifyUserRes.data.user);
    return verifyUserRes.data.user;
  } else {
    this.logout();
  }
}

async function verifyEmail(code) {
  const requestOptions = {
    method: "POST",
    headers: { "Authorization": "Bearer " +  this.authTokenValue, "Content-Type": "application/json"},
    body: JSON.stringify({ code })
  };

  const verifyEmailRes = await (await fetch(`${config.client.apiUrl}/auth/confirm_email`, requestOptions)).json();
  if (verifyEmailRes.success) {
    localStorage.setItem("currentUser", JSON.stringify(verifyEmailRes.data.user));
    currentUserSubject.next(verifyEmailRes.data.user);
    return verifyEmailRes.data.user;
  } else {
    throw new Error(verifyEmailRes.message);
  }
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  localStorage.removeItem("authToken");
  currentUserSubject.next(null);
  authTokenSubject.next(null);
}
