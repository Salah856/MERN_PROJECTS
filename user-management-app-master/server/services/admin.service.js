/*
 * File: admin.service.js
 * Project: user-management
 * File Created: Friday, 7th June 2019 12:15:47 pm
 * Author: Matthew Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 2:41:29 pm
 * Modified By: Matthew Raymer (matthew.raymer@anomalistdesign.com>)
 * -----
 * Copyright 2019, ADDLC
 */

const MongoService = require("./mongo.service");
const BcryptService = require("./bcrypt.service");
const JwtService = require("./jwt.service");
const EmailService = require("./email.service");
const UsersService = require("./user.service");

class AdminService {
  constructor() {
    this.users = new MongoService().db.collection("users");
    this.bcryptService = new BcryptService();
    this.jwtService = new JwtService();
    this.emailService = new EmailService();
    this.usersService = new UsersService();
  }

  async createAdmin(admin) {
    try {
      const isAdminExist = await this.usersService.isEmailExist(admin.email);
      if (!isAdminExist) {
        admin.role = "admin";
        admin.password = await this.bcryptService.hash(admin.password);
        admin.emailVerified = true;
        await this.users.insertOne(admin);
        return "Admin created!";
      }
      return "Admin already exist!";
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = AdminService;
