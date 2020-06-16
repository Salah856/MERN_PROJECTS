/*
 * File: admin.js
 * Project: social-network-app
 * File Created: Friday, 7th June 2019 12:13:30 pm
 * Author: Matthew Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 3:20:54 pm
 * Modified By: Matthew Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */

const UserService = require("../../services/user.service");
const AuthMiddleware = require("../../middleware/auth.middleware");
const AdminMiddleware = require("../../middleware/admin.middleware");

module.exports = async app => {
  const userService = new UserService();
  /**
   * @api {post} /api/admin/user/create Create User
   * @apiVersion 1.0.0
   * @apiName create
   * @apiGroup Admin
   *
   * @apiHeader {String} authorization Bearer Token.
   *
   * @apiParam {String} email Users email.
   * @apiParam {String} password Users password.
   * @apiParam {String} fullname Users fullname.
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {String} message Returns message results.
   */
  app.post(
    "/api/admin/user/create",
    AuthMiddleware,
    AdminMiddleware,
    async (req, res) => {
      try {
        const user = req.body;
        await userService.createUser({
          email: user.email,
          password: user.password,
          fullname: user.fullname
        });
        res.json({
          success: true,
          message: "User Creation Success!"
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
   * @api {get} /api/admin/user/fetchAll Fetch All Users
   * @apiVersion 1.0.0
   * @apiName fetchAll
   * @apiGroup Admin
   *
   * @apiHeader {String} authorization Bearer Token.
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {Object} data Contains the user information.
   * @apiSuccess {Array} data.users Array of Users with their information.
   * @apiSuccess {String} message Returns message results.
   */
  app.get(
    "/api/admin/user/fetchAll",
    AuthMiddleware,
    AdminMiddleware,
    async (req, res) => {
      try {
        const users = await userService.fetchAllUsers();
        res.json({
          success: true,
          data: {
            users
          },
          message: "User Fetch Success!"
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
   * @api {post} /api/admin/user/update Update User
   * @apiVersion 1.0.0
   * @apiName update
   * @apiGroup Admin
   *
   * @apiHeader {String} authorization Bearer Token.
   *
   * @apiParam {String} id Users id.
   * @apiParam {String} email Users email.
   * @apiParam {String} fullname Users fullname.
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {String} message Returns message results.
   */
  app.post(
    "/api/admin/user/update",
    AuthMiddleware,
    AdminMiddleware,
    async (req, res) => {
      try {
        const user = req.body;
        await userService.updateUser(user.id, {
          fullname: user.fullname
        });
        res.json({
          success: true,
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
  /**
   * @api {delete} /api/admin/user/delete/:id Delete User
   * @apiVersion 1.0.0
   * @apiName delete
   * @apiGroup Admin
   *
   * @apiHeader {String} authorization Bearer Token.
   *
   * @apiParam {String} id Users id.
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {String} message Returns message results.
   */
  app.delete(
    "/api/admin/user/delete/:id",
    AuthMiddleware,
    AdminMiddleware,
    async (req, res) => {
      try {
        const user = req.params;
        await userService.deleteUser(user.id);
        res.json({
          success: true,
          message: "User Deletion Success!"
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
