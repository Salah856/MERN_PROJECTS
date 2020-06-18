/*
 * File: webhook.js
 * Project: webscraping-app
 * File Created: Thursday, 20th June 2019 3:46:36 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Thursday, 20th June 2019 3:46:43 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

const FeedService = require("../../services/feed.service");

module.exports = async app => {
  const feedService = new FeedService();
  /**
   * @api {post} /api/webhook Receive Webhooks
   * @apiVersion 1.0.0
   * @apiName webhook
   * @apiGroup Webhook
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {String} message Returns message results.
   */
  app.post(
    "/api/webhook",
    async (req, res) => {
      try {
        const feed = req.body;
        feedService.setFeed(feed);
        res.json({
          success: true,
          message: "Webhook Received Success!"
        });
      } catch (err) {
        res.json({
          success: false,
          message: err.message
        });
      }
    }
  );
};
