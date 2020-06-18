/*
 * File: feed.js
 * Project: social-network-app
 * File Created: Thursday, 20th June 2019 3:46:36 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Thursday, 20th June 2019 3:46:43 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */

const FeedService = require("../../services/feed.service");
const AuthMiddleware = require("../../middleware/auth.middleware");
const UserMiddleware = require("../../middleware/user.middleware");

module.exports = async app => {
  const feedService = new FeedService();
  /**
   * @api {post} /api/feed/post Post Feed
   * @apiVersion 1.0.0
   * @apiName postFeed
   * @apiGroup Feed
   *
   * @apiHeader {String} authorization Bearer Token.
   *
   * @apiParam {String} feed Feed Text Message.
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {String} message Returns message results.
   */
  app.post(
    "/api/feed/post",
    AuthMiddleware,
    UserMiddleware,
    async (req, res) => {
      try {
        await feedService.postFeed(res.user._id, req.body.feed);
        res.json({
          success: true,
          message: "Post Feed Success!"
        });
      } catch (err) {
        res.json({
          success: false,
          message: err.message
        });
      }
    }
  );
  /**
   * @api {post} /api/feed/post/comment Post Feed Comment
   * @apiVersion 1.0.0
   * @apiName postFeedComment
   * @apiGroup Feed
   *
   * @apiHeader {String} authorization Bearer Token.
   *
   * @apiParam {String} comment Feed Comment Text Message.
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {String} message Returns message results.
   */
  app.post(
    "/api/feed/post/comment",
    AuthMiddleware,
    UserMiddleware,
    async (req, res) => {
      try {
        await feedService.postFeedComment(req.body.feedId, res.user._id, req.body.comment);
        res.json({
          success: true,
          message: "Post Feed Comment Success!"
        });
      } catch (err) {
        res.json({
          success: false,
          message: err.message
        });
      }
    }
  );
  /**
   * @api {post} /api/feed/fetch Fetch Feeds
   * @apiVersion 1.0.0
   * @apiName fetchFeeds
   * @apiGroup Feed
   *
   * @apiHeader {String} authorization Bearer Token.
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {Object} data Contains the feeds information.
   * @apiSuccess {Array} data.feeds Array of Feeds with their information.
   * @apiSuccess {String} message Returns message results.
   */
  app.post(
    "/api/feed/fetch",
    AuthMiddleware,
    UserMiddleware,
    async (req, res) => {
      try {
        let feeds;
        if (req.body.isWallFeed) {
          feeds = await feedService.fetchWallFeeds(res.user._id);
        } else {
          feeds = await feedService.fetchUserFeeds(res.user._id);
        }
        res.json({
          success: true,
          data: {
            feeds
          },
          message: "Fetch Feeds Success!"
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
