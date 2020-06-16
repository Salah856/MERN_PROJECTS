/*
 * File: message.service.js
 * Project: social-network-app
 * File Created: Tuesday, 18th June 2019 2:24:08 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Wednesday, 19th June 2019 1:03:02 am
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */

import config from "../../../config/config";
import { authService } from "./auth.service";

export const messageService = {
  sendMessage,
  fetchMessages
};

async function sendMessage(to, message) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + authService.authTokenValue,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ to, message })
  };

  const sendMessageRes = await (await fetch(
    `${config.client.apiUrl}/message/send`,
    requestOptions
  )).json();
  if (sendMessageRes.success) {
    return sendMessageRes.message;
  } else {
    throw new Error(sendMessageRes.message);
  }
}

async function fetchMessages(to) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + authService.authTokenValue,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ to })
  };

  const fetchMessagesRes = await (await fetch(
    `${config.client.apiUrl}/message/fetch`,
    requestOptions
  )).json();
  if (fetchMessagesRes.success) {
    return fetchMessagesRes.data.messages;
  } else {
    throw new Error(fetchMessagesRes.message);
  }
}
