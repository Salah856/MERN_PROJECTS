/*
 * File: people.service.js
 * Project: social-network-app
 * File Created: Wednesday, 12th June 2019 1:55:52 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Wednesday, 12th June 2019 1:56:24 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */

const MongoService = require("./mongo.service");
const ObjectId = require("mongodb").ObjectId;
const FollowerService = require("./follower.service");

class PeopleService {
  constructor() {
    this.users = new MongoService().db.collection("users");
    this.followerService = new FollowerService();
  }

  async fetchAll(userId) {
    const users = (await this.users.aggregate([
      {
        $match: {
          _id: {
            $ne: ObjectId(userId)
          }
        }
      },
      {
        $project: {
          followers: 1,
          isFollower: {
            $cond: {
              if: { $in: [ObjectId(userId), "$followers"] },
              then: true,
              else: false
            }
          },
          fullname: 1,
          profilePicture: 1
        }
      }
    ]))
      .toArray();
    return users;
  }

  async searchPeople(userId, keyword) {
    if (!keyword) {
      return await this.fetchAll();
    }
    const users = (await this.users.aggregate([
      {
        $match: {
          keywords: {
            $in: [keyword]
          }
        }
      },
      {
        $project: {
          followers: 1,
          isFollower: {
            $cond: {
              if: { $in: [ObjectId(userId), "$followers"] },
              then: true,
              else: false
            }
          },
          fullname: 1,
          profilePicture: 1
        }
      }
    ]))
      .toArray();
    return users;
  }
}

module.exports = PeopleService;
