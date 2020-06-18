/*
 * File: auth.js
 * Project: user-management
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 3:20:49 pm
 * Modified By: Matthew Raymer (matthew.raymer@anomalistdesign.com>)
 * -----
 * Copyright 2019, ADDLC
 */

const AuthService = require("../../services/auth.service");
const UsersService = require("../../services/user.service");
const AuthMiddleware = require("../../middleware/auth.middleware");

module.exports = async app => {
  const authService = new AuthService();
  const usersService = new UsersService();
  /**
   * @api {post} /api/auth/login Login
   * @apiVersion 1.0.0
   * @apiName login
   * @apiGroup Auth
   *
   * @apiParam {String} email Users email.
   * @apiParam {String} password Users password.
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {Object} data Contains the user information and auth token.
   * @apiSuccess {Object} data.user User information.
   * @apiSuccess {Object} data.token User Auth Token.
   */
  app.post("/api/auth/login", async (req, res) => {
    try {
      const user = req.body;
      const loginRes = await authService.login(user.email, user.password);
      res.json({
        success: true,
        data: {
          user: loginRes.user,
          token: loginRes.token
        },
        message: "Login Success!"
      });
    } catch (err) {
      res.json({
        success: false,
        message: err.message
      });
    }
  });
  /**
   * @api {post} /api/auth/register Register
   * @apiVersion 1.0.0
   * @apiName register
   * @apiGroup Auth
   *
   * @apiParam {String} email Users email.
   * @apiParam {String} password Users password.
   * @apiParam {String} fullname Users fullname.
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {String} message Returns message results.
   */
  app.post("/api/auth/register", async (req, res) => {
    try {
      const user = req.body;
      await authService.register({
        email: user.email,
        password: user.password,
        fullname: user.fullname
      });
      res.json({
        success: true,
        message: "Register Success!"
      });
    } catch (err) {
      res.json({
        success: false,
        message: err.message
      });
    }
  });
  /**
   * @api {get} /api/auth/verify Verify Authentication
   * @apiVersion 1.0.0
   * @apiName auth
   * @apiGroup Auth
   *
   * @apiHeader {String} authorization Bearer Token.
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {Object} data Contains the user information.
   * @apiSuccess {Object} data.user User information.
   * @apiSuccess {String} message Returns message results.
   */
  app.get("/api/auth/verify", AuthMiddleware, async (req, res) => {
    try {
      const user = await usersService.findUserbyId(res.user._id);
      res.json({
        success: true,
        data: {
          user
        },
        message: "User Fetch Success!"
      });
    } catch (err) {
      res.json({
        success: false,
        message: err.message
      });
    }
  });
  /**
   * @api {post} /api/auth/confirm_email Email Confirmation
   * @apiVersion 1.0.0
   * @apiName confirm_email
   * @apiGroup Auth
   *
   * @apiHeader {String} authorization Bearer Token.
   *
   * @apiParam {String} code Email Confirmation Code.
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {Object} data Contains the user information.
   * @apiSuccess {Object} data.user User information.
   * @apiSuccess {String} message Returns message results.
   */
  app.post("/api/auth/confirm_email", AuthMiddleware, async (req, res) => {
    try {
      let user = res.user;
      const emailVerificationCode = req.body.code;
      user = await authService.verifyEmail(user._id, emailVerificationCode);
      res.json({
        success: true,
        data: {
          user
        },
        message: "Email Confirmation Success!"
      });
    } catch (err) {
      res.json({
        success: false,
        message: err.message
      });
    }
  });
};
