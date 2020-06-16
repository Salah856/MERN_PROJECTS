/*
 * File: auth.middleware.js
 * Project: social-network-app
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Wednesday, 5th June 2019 12:47:14 pm
 * Modified By: Matthew Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */
const UsersService = require("../services/user.service");

const AdminMiddleware = async (req, res, next) => {
  const usersService = new UsersService();
  const user = await usersService.findUserbyId(res.user._id);
  if (
    user.role === "admin"
  ) {
    next();
  } else {
    res.json({
        success: false,
        message: "You are not an admin!"
    });
  }
};

module.exports = AdminMiddleware;
