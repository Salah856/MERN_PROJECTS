/*
 * File: sockjs.service.js
 * Project: webscraping-app
 * File Created: Friday, 19th July 2019 11:39:39 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 19th July 2019 11:39:41 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

import config from "../../../config/config";

export const sockjsService = {
  connect
};

function connect() {
  const sock = new SockJS(config.client.sockjsUrl);
  return sock;
}
