/*
 * File: message.js
 * Project: social-network-app
 * File Created: Wednesday, 19th June 2019 12:15:34 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Wednesday, 19th June 2019 12:15:47 am
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */

const MessageService = require("../../services/message.service");
const AuthMiddleware = require("../../middleware/auth.middleware");
const UserMiddleware = require("../../middleware/user.middleware");

module.exports = async app => {
  const messageService = new MessageService();
  /**
   * @api {post} /api/message/send Send Message
   * @apiVersion 1.0.0
   * @apiName sendMessage
   * @apiGroup Message
   *
   * @apiHeader {String} authorization Bearer Token.
   *
   * @apiParam {String} to user's follower's user id to send to the message.
   * @apiParam {String} message the content of the message to be sent.
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {String} message Returns message results.
   */
  app.post(
    "/api/message/send",
    AuthMiddleware,
    UserMiddleware,
    async (req, res) => {
      try {
        await messageService.sendMessage(
          res.user._id,
          req.body.to,
          req.body.message
        );
        res.json({
          success: true,
          message: "Send Message Success!"
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
   * @api {post} /api/message/fetch Fetch User's Messages
   * @apiVersion 1.0.0
   * @apiName fetchMessages
   * @apiGroup Message
   *
   * @apiHeader {String} authorization Bearer Token.
   * 
   * @apiParam {String} to user's follower's user id.
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {Object} data Contains the message information.
   * @apiSuccess {Object} data.messages list of user's messages.
   * @apiSuccess {String} message Returns message results.
   */
  app.post(
    "/api/message/fetch",
    AuthMiddleware,
    UserMiddleware,
    async (req, res) => {
      try {
        const messages = await messageService.fetchMessages(res.user._id, req.body.to);
        res.json({
          success: true,
          data: {
            messages
          },
          message: "Fetch Message Success!"
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
