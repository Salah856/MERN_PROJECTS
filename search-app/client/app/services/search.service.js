/*
 * File: search.service.js
 * Project: search-app
 * File Created: Monday, 22nd July 2019 2:54:57 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Monday, 22nd July 2019 6:10:59 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

import config from "../../../config/config";

export const searchService = {
  searchFeed,
  searchSuggestions
};

async function searchFeed(options) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ options })
  };

  const searchFeedRes = await (await fetch(
    `${config.client.apiUrl}/search/feeds`,
    requestOptions
  )).json();
  if (searchFeedRes.success) {
    return searchFeedRes.data.feeds;
  } else {
    throw new Error(searchFeedRes.message);
  }
}

async function searchSuggestions(keyword) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ keyword })
  };

  const searchSuggestionsRes = await (await fetch(
    `${config.client.apiUrl}/search/suggestions`,
    requestOptions
  )).json();
  if (searchSuggestionsRes.success) {
    return searchSuggestionsRes.data.suggestions;
  } else {
    throw new Error(searchSuggestionsRes.message);
  }
}
