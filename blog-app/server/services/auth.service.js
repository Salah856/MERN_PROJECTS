/*
 * File: auth.service.js
 * Project: blog-app
 * File Created: Friday, 7th June 2019 12:15:39 pm
 * Author: Matthew Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 3:20:26 pm
 * Modified By: Matthew Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

const MongoService = require("./mongo.service");
const BcryptService = require("./bcrypt.service");
const JwtService = require("./jwt.service");
const ObjectId = require("mongodb").ObjectId;
const EmailService = require("./email.service");
const UserService = require("./user.service");

class AuthService {
  constructor() {
    this.users = new MongoService().db.collection("users");
    this.bcryptService = new BcryptService();
    this.jwtService = new JwtService();
    this.emailService = new EmailService();
    this.userService = new UserService();
  }

  async login(email, plainPassword) {
    const isEmailExist = await this.userService.isEmailExist(email);
    if (isEmailExist) {
      const user = await this.userService.findUserbyEmail(email);
      const isPasswordVerified = await this.bcryptService.compare(
        plainPassword,
        user.password
      );
      if (isPasswordVerified) {
        const token = await this.jwtService.generateToken({
          _id: user._id,
          email: user.email
        });
        delete user.password;
        return {
          user,
          token
        };
      }
    }
    throw new Error("Login Failed!");
  }

  async register(user) {
    try {
      await this.userService.createUser(user);
      return null;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async verifyEmail(_id, plainCode) {
    const user = await this.userService.findUserbyId(_id);
    const isEmailVerified = await this.bcryptService.compare(
      plainCode,
      user.emailVerificationCode
    );
    if (isEmailVerified) {
      await this.users.updateOne(
        { _id: ObjectId(_id) },
        {
          $set: {
            email: user.newEmail,
            emailVerified: true
          }
        }
      );
      return await this.userService.findUserbyId(_id);
    }
    throw new Error("Code Invalid!");
  }
}

module.exports = AuthService;
