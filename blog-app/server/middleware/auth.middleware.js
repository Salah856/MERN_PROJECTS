/*
 * File: auth-middleware.js
 * Project: blog-app
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 2:41:16 pm
 * Modified By: Matthew Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

const JwtService = require("../services/jwt.service");

const AuthMiddleware = async (req, res, next) => {
  const jwtService = new JwtService();
  let authType;
  let authToken;
  let isTokenVerified;
  if (
    req.headers.authorization
  ) {
    authType = req.headers.authorization.split(" ")[0];
    authToken = req.headers.authorization.split(" ")[1];
    isTokenVerified = await jwtService.verifyToken(authToken);
  }
  if (
    req.headers.authorization &&
    authType === "Bearer" &&
    isTokenVerified
  ) {
    const user = isTokenVerified;
    res.user = user;
    next();
  } else {
    res.json({
        success: false,
        message: "Authorization Required!"
    });
  }
};

module.exports = AuthMiddleware;
