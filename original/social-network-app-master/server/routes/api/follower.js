/*
 * File: follower.js
 * Project: social-network-app
 * File Created: Wednesday, 12th June 2019 2:37:21 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Wednesday, 12th June 2019 2:37:43 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */

const FollowerService = require("../../services/follower.service");
const AuthMiddleware = require("../../middleware/auth.middleware");
const UserMiddleware = require("../../middleware/user.middleware");

module.exports = async app => {
  const followerService = new FollowerService();
  /**
   * @api {post} /api/user/follower Add Follower
   * @apiVersion 1.0.0
   * @apiName addFollower
   * @apiGroup Follower
   *
   * @apiHeader {String} authorization Bearer Token.
   *
   * @apiParam {String} followerId Follower's Id ref to Users.
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {String} message Returns message results.
   */
  app.post(
    "/api/user/follower",
    AuthMiddleware,
    UserMiddleware,
    async (req, res) => {
      try {
        await followerService.addFollower(res.user._id, req.body.followerId);
        res.json({
          success: true,
          message: "Add Follower Success!"
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
   * @api {delete} /api/user/follower Remove Follower
   * @apiVersion 1.0.0
   * @apiName removeFollower
   * @apiGroup Follower
   *
   * @apiHeader {String} authorization Bearer Token.
   *
   * @apiParam {String} followerId Follower's Id ref to Users.
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {String} message Returns message results.
   */
  app.delete(
    "/api/user/follower",
    AuthMiddleware,
    UserMiddleware,
    async (req, res) => {
      try {
        await followerService.removeFollower(res.user._id, req.body.followerId);
        res.json({
          success: true,
          message: "Remove Follower Success!"
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
   * @api {post} /api/user/follower/fetch Fetch Followers
   * @apiVersion 1.0.0
   * @apiName fetchFollowers
   * @apiGroup Follower
   *
   * @apiHeader {String} authorization Bearer Token.
   *
   * @apiParam {String} limit number of Followers to fetch
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {Object} data Contains the followers information.
   * @apiSuccess {Array} data.followers Array of Followers with their information.
   * @apiSuccess {String} message Returns message results.
   */
  app.post(
    "/api/user/follower/fetch",
    AuthMiddleware,
    UserMiddleware,
    async (req, res) => {
      try {
        const followers = await followerService.fetchFollowers(
          res.user._id,
          req.body.limit
        );
        res.json({
          success: true,
          data: {
            followers
          },
          message: "Fetch Followers Success!"
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
