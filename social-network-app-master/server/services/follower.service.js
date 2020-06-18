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

class FollowerService {
  constructor() {
    this.users = new MongoService().db.collection("users");
  }

  async addFollower(userId, followerId) {
    await this.users.update(
      {
        _id: ObjectId(followerId)
      },
      {
        $addToSet: {
          followers: ObjectId(userId)
        }
      }
    );
  }

  async removeFollower(userId, followerId) {
    await this.users.update(
      {
        _id: ObjectId(followerId)
      },
      {
        $pull: {
          followers: ObjectId(userId)
        }
      }
    );
  }

  async fetchFollowers(userId, limit) {
    try {
      const query = [
        {
          $lookup: {
            from: "users",
            localField: "followers",
            foreignField: "_id",
            as: "followers"
          }
        },
        {
          $match: {
            _id: {
              $eq: ObjectId(userId)
            }
          }
        },
        {
          $project: {
            followers: {
              _id: 1,
              fullname: 1,
              profilePicture: 1
            }
          }
        }
      ];
      if (limit) {
        query.splice(2, 0, {
          $limit: limit
        });
      }
      const followers = (await (await this.users.aggregate(query)).toArray())[0]
        .followers;
      return followers;
    } catch (err) {
      return [];
    }
  }
}

module.exports = FollowerService;
