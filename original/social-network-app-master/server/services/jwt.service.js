/*
 * File: jwt.service.js
 * Project: social-network-app
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 3:19:56 pm
 * Modified By: Matthew Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */

const jwt = require("jsonwebtoken");
let jwtSecretKey;

class JwtService {
  constructor() {
    this.jwtSecretKey = jwtSecretKey;
  }

  setConfig(secretKey) {
    jwtSecretKey = secretKey;
  }

  async generateToken(content) {
    return await jwt.sign(content, this.jwtSecretKey);
  }

  async verifyToken(token) {
    try {
      return await jwt.verify(token, this.jwtSecretKey);
    } catch (err) {
      return false;
    }
  }
}

module.exports = JwtService;
