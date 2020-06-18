/*
 * File: user.service.js
 * Project: user-management
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 3:20:06 pm
 * Modified By: Matthew Raymer (matthew.raymer@anomalistdesign.com>)
 * -----
 * Copyright 2019, ADDLC
 */

const MongoService = require("./mongo.service");
const BcryptService = require("./bcrypt.service");
const JwtService = require("./jwt.service");
const ObjectId = require("mongodb").ObjectId;
const EmailService = require("./email.service");

class UserService {
  constructor() {
    this.users = new MongoService().db.collection("users");
    this.bcryptService = new BcryptService();
    this.jwtService = new JwtService();
    this.emailService = new EmailService();
  }

  generateVerificationCode() {
    const plainCode = (Math.floor(Math.random() * 900000) + 100000).toString();
    return plainCode;
  }

  async isEmailExist(email) {
    return await this.users.countDocuments({
      email
    });
  }

  async findUserbyEmail(email) {
    const user = await this.users.findOne({
      email
    });
    return user;
  }

  async findUserbyId(_id) {
    const user = await this.users.findOne({
      _id: ObjectId(_id)
    });
    return user;
  }

  async createUser(user) {
    try {
      const isEmailExist = await this.isEmailExist(user.email);
      if (!isEmailExist) {
        user.role = "user";
        user.password = await this.bcryptService.hash(user.password);
        user.emailVerified = false;
        user.newEmail = user.email;
        const plainCode = this.generateVerificationCode();
        user.emailVerificationCode = await this.bcryptService.hash(plainCode);
        await this.users.insertOne(user);
        this.emailService.sendEmail(user.email, "new-email-account", {
          emailVerificationCode: plainCode
        });
        return null;
      }
      throw new Error("Email already exist!");
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async fetchAllUsers() {
    return (await this.users.find({})).toArray();
  }

  async updateUser(_id, user) {
    const isEmailExist = await this.isEmailExist(user.email);
    if (!isEmailExist) {
      if (user.password !== undefined) {
        user.password = await this.bcryptService.hash(user.password);
      }
      let emailExist = false;
      if (user.email !== undefined) {
        emailExist = true;
      }
      if (emailExist) {
        const plainCode = this.generateVerificationCode();
        user.emailVerificationCode = await this.bcryptService.hash(plainCode);
        await this.users.updateOne(
          { _id: ObjectId(_id) },
          {
            $set: {
              fullname: user.fullname,
              newEmail: user.email,
              emailVerified: false,
              emailVerificationCode: user.emailVerificationCode
            }
          }
        );
        this.emailService.sendEmail(user.email, "new-email-account", {
          emailVerificationCode: plainCode
        });
      } else {
        await this.users.updateOne(
          { _id: ObjectId(_id) },
          {
            $set: {
              fullname: user.fullname
            }
          }
        );
      }
      user = await this.findUserbyId(_id);
      return user;
    }
    throw new Error("Email already exist!");
  }

  async deleteUser(_id) {
    return await this.users.deleteOne({ _id: ObjectId(_id) });
  }
}

module.exports = UserService;
