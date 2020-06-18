/*
 * File: webhook.service.js
 * Project: webscraping-app
 * File Created: Monday, 22nd July 2019 4:30:47 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Monday, 22nd July 2019 4:31:03 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

const request = require("request");
let webhookConfig;

class webhookService {
  constructor() {
    this.webhookConfig = webhookConfig;
  }
  setup(_webhookConfig) {
    webhookConfig = _webhookConfig;
  }
  sendFeed(feed) {
    return new Promise(
      (resolve) => {
        request({
          method: "POST",
          uri: webhookConfig.targetUrl,
          form: feed
        }, () => {
          resolve();
        });
      }
    )
  }
}

module.exports = webhookService;
