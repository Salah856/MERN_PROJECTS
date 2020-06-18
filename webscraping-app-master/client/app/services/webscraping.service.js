/*
 * File: webscraping.service.js
 * Project: webscraping-app
 * File Created: Wednesday, 17th July 2019 12:17:17 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Wednesday, 17th July 2019 12:17:22 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

import config from "../../../config/config";

export const webscrapingService = {
  startWebscraping,
  stopWebscraping
};

async function startWebscraping() {
  const requestOptions = {
    method: "PUT"
  };

  const startWebscrapingRes = await (await fetch(
    `${config.client.apiUrl}/webscraping/start`,
    requestOptions
  )).json();
  if (startWebscrapingRes.success) {
    return startWebscrapingRes.message;
  } else {
    throw new Error(startWebscrapingRes.message);
  }
}

async function stopWebscraping() {
  const requestOptions = {
    method: "PUT"
  };

  const stopWebscrapingRes = await (await fetch(
    `${config.client.apiUrl}/webscraping/stop`,
    requestOptions
  )).json();
  if (stopWebscrapingRes.success) {
    return stopWebscrapingRes.message;
  } else {
    throw new Error(stopWebscrapingRes.message);
  }
}
