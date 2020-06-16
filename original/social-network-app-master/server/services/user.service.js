/*
 * File: user.service.js
 * Project: social-network-app
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 3:20:06 pm
 * Modified By: Matthew Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */

const MongoService = require("./mongo.service");
const BcryptService = require("./bcrypt.service");
const JwtService = require("./jwt.service");
const ObjectId = require("mongodb").ObjectId;
const EmailService = require("./email.service");
const KeywordService = require("./keyword.service");

class UserService {
  constructor() {
    this.users = new MongoService().db.collection("users");
    this.bcryptService = new BcryptService();
    this.jwtService = new JwtService();
    this.emailService = new EmailService();
    this.keywordService = new KeywordService();
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
      "_id": ObjectId(_id)
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
        user.profilePicture = "data:image/png;base64,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";
        user.followers = [];
        user.keywords = this.keywordService.generateKewords(user.fullname);
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

  async fetchAllUsers(id) {
    return (await this.users.find({ _id: { $ne: ObjectId(id) } })).toArray();
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
              emailVerificationCode: user.emailVerificationCode,
              profilePicture: user.profilePicture
            }
          }
        );
        this.emailService.sendEmail(user.email, "new-email-account", {
          emailVerificationCode: plainCode
        });
      } else {
        user.keywords = this.keywordService.generateKewords(user.fullname);
        await this.users.updateOne(
          { _id: ObjectId(_id) },
          {
            $set: {
              fullname: user.fullname,
              profilePicture: user.profilePicture,
              keywords: user.keywords
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
