/*
 * File: bcrypt.service.js
 * Project: user-management
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 3:20:19 pm
 * Modified By: Matthew Raymer (matthew.raymer@anomalistdesign.com>)
 * -----
 * Copyright 2019, ADDLC
 */

const bcrypt = require("bcryptjs");

class BcryptService {
  constructor() {}

  async hash(plain) {
    const salt = await bcrypt.genSaltSync(10);
    const hashed = await bcrypt.hashSync(plain, salt);
    return hashed;
  }

  async compare(plain, password) {
    return await bcrypt.compare(plain, password);
  }
}

module.exports = BcryptService;
