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

export const feedService = {
  postFeed,
  postFeedComment,
  fetchFeeds
};

async function postFeed(feed) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + authService.authTokenValue,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ feed })
  };

  const postFeedRes = await (await fetch(
    `${config.client.apiUrl}/feed/post`,
    requestOptions
  )).json();
  if (postFeedRes.success) {
    return postFeedRes.message;
  } else {
    throw new Error(postFeedRes.message);
  }
}

async function postFeedComment(feedId, comment) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + authService.authTokenValue,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ feedId, comment })
  };

  const postFeedCommentRes = await (await fetch(
    `${config.client.apiUrl}/feed/post/comment`,
    requestOptions
  )).json();
  if (postFeedCommentRes.success) {
    return postFeedCommentRes.message;
  } else {
    throw new Error(postFeedCommentRes.message);
  }
}

async function fetchFeeds(isWallFeed) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + authService.authTokenValue,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ isWallFeed })
  };

  const fetchFeedsRes = await (await fetch(
    `${config.client.apiUrl}/feed/fetch`,
    requestOptions
  )).json();
  if (fetchFeedsRes.success) {
    return fetchFeedsRes.data.feeds;
  } else {
    throw new Error(fetchFeedsRes.message);
  }
}
