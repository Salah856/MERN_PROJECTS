/*
 * File: user-middleware.js
 * Project: social-network-app
 * File Created: Friday, 7th June 2019 2:35:58 pm
 * Author: Matthew Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 2:41:06 pm
 * Modified By: Matthew Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */

const UsersService = require("../services/user.service");

const AdminMiddleware = async (req, res, next) => {
  const usersService = new UsersService();
  const user = await usersService.findUserbyId(res.user._id);
  if (
    user.role === "admin" ||
    user.role === "user"
  ) {
    next();
  } else {
    res.json({
        success: false,
        message: "You are not a user!"
    });
  }
};

module.exports = AdminMiddleware;
