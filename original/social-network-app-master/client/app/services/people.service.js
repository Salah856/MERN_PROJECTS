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

export const peopleService = {
  fetchAll,
  searchPeople
};

async function fetchAll() {
  const requestOptions = {
    method: "GET",
    headers: { Authorization: "Bearer " + authService.authTokenValue }
  };

  const fetchAllRes = await (await fetch(
    `${config.client.apiUrl}/people`,
    requestOptions
  )).json();
  if (fetchAllRes.success) {
    return fetchAllRes.data.people;
  } else {
    throw new Error(fetchAllRes.message);
  }
}

async function searchPeople(keyword) {
  const requestOptions = {
    method: "POST",
    headers: { "Authorization": "Bearer " +  authService.authTokenValue, "Content-Type": "application/json"},
    body: JSON.stringify({ keyword })
  };

  const searchPeopleRes = await (await fetch(
    `${config.client.apiUrl}/people/search`,
    requestOptions
  )).json();
  if (searchPeopleRes.success) {
    return searchPeopleRes.data.people;
  } else {
    throw new Error(searchPeopleRes.message);
  }
}