/*
 * File: feeds.service.js
 * Project: social-network-app
 * File Created: Thursday, 20th June 2019 3:43:30 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Thursday, 20th June 2019 3:43:44 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */

const MongoService = require("./mongo.service");
const ObjectId = require("mongodb").ObjectId;
const FollowerService = require("./follower.service");

class FeedService {
  constructor() {
    this.feeds = new MongoService().db.collection("feeds");
    this.followerService = new FollowerService();
  }

  async postFeed(userId, feed) {
    await this.feeds.insertOne({
      userId: ObjectId(userId),
      feed,
      comments: [],
      createdDate: new Date()
    });
  }

  async postFeedComment(feedId, userId, comment) {
    await this.feeds.update(
      {
        _id: ObjectId(feedId)
      },
      {
        $addToSet: {
          comments: {
            _id: ObjectId(),
            userId: ObjectId(userId),
            comment,
            createdDate: new Date()
          }
        }
      }
    );
  }

  async fetchUserFeeds(userId) {
    const feeds = (await this.feeds.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $project: {
          user: { $arrayElemAt: ["$user", 0] },
          feed: 1,
          createdDate: 1,
          comments: 1
        }
      },
      {
        $match: {
          "user._id": ObjectId(userId)
        }
      },
      {
        $unwind: {
          path: "$comments",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "comments.userId",
          foreignField: "_id",
          as: "comments.user"
        }
      },
      {
        $group: {
          _id: "$_id",
          user: { $first: "$user" },
          feed: { $first: "$feed" },
          createdDate: { $first: "$createdDate" },
          comments: {
            $push: {
              _id: "$comments._id",
              user: { $arrayElemAt: ["$comments.user", 0] },
              comment: "$comments.comment",
              createdDate: "$comments.createdDate"
            }
          }
        }
      },
      {
        $project: {
          user: {
            _id: 1,
            fullname: 1,
            profilePicture: 1
          },
          feed: 1,
          createdDate: 1,
          comments: {
            _id: 1,
            user: {
              _id: 1,
              fullname: 1,
              profilePicture: 1
            },
            comment: 1,
            createdDate: 1
          }
        }
      }
    ]))
      .sort({
        createdDate: -1
      })
      .toArray();
    return feeds;
  }

  async fetchWallFeeds(userId) {
    const feeds = (await this.feeds.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $project: {
          user: { $arrayElemAt: ["$user", 0] },
          feed: 1,
          createdDate: 1,
          comments: 1
        }
      },
      {
        $match: {
          $or: [
            {
              "user._id": ObjectId(userId)
            },
            {
              "user.followers": {
                $in: [ObjectId(userId)]
              }
            }
          ]
        }
      },
      {
        $unwind: {
          path: "$comments",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "comments.userId",
          foreignField: "_id",
          as: "comments.user"
        }
      },
      {
        $group: {
          _id: "$_id",
          user: { $first: "$user" },
          feed: { $first: "$feed" },
          createdDate: { $first: "$createdDate" },
          comments: {
            $push: {
              _id: "$comments._id",
              user: { $arrayElemAt: ["$comments.user", 0] },
              comment: "$comments.comment",
              createdDate: "$comments.createdDate"
            }
          }
        }
      },
      {
        $project: {
          user: {
            _id: 1,
            fullname: 1,
            profilePicture: 1
          },
          feed: 1,
          createdDate: 1,
          comments: {
            _id: 1,
            user: {
              _id: 1,
              fullname: 1,
              profilePicture: 1
            },
            comment: 1,
            createdDate: 1
          }
        }
      }
    ]))
      .sort({
        createdDate: -1
      })
      .toArray();
    return feeds;
  }
}

module.exports = FeedService;
