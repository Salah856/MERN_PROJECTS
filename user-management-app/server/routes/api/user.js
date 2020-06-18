/*
 * File: user.js
 * Project: user-management
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 3:20:39 pm
 * Modified By: Matthew Raymer (matthew.raymer@anomalistdesign.com>)
 * -----
 * Copyright 2019, ADDLC
 */

const UserService = require("../../services/user.service");
const AuthMiddleware = require("../../middleware/auth.middleware");
const UserMiddleware = require("../../middleware/user.middleware");

module.exports = async app => {
  const userService = new UserService();
  /**
   * @api {post} /api/user/update Update
   * @apiVersion 1.0.0
   * @apiName update
   * @apiGroup User
   *
   * @apiHeader {String} authorization Bearer Token.
   *
   * @apiParam {String} email Users email.
   * @apiParam {String} fullname Users fullname.
   * @apiParam {String} password Users password.
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {Object} data Contains the user information.
   * @apiSuccess {Object} data.user User information.
   * @apiSuccess {String} message Returns message results.
   */
  app.post(
    "/api/user/update",
    AuthMiddleware,
    UserMiddleware,
    async (req, res) => {
      try {
        let user = res.user;
        const email = req.body.email;
        const fullname = req.body.fullname;
        const password = req.body.password;
        user = await userService.updateUser(user._id, {
          email,
          fullname,
          password
        });
        res.json({
          success: true,
          data: {
            user
          },
          message: "User Update Success!"
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
