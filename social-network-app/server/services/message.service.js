/*
 * File: message.service.js
 * Project: social-network-app
 * File Created: Wednesday, 19th June 2019 12:04:15 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Wednesday, 19th June 2019 12:04:25 am
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */

const MongoService = require("./mongo.service");
const ObjectId = require("mongodb").ObjectId;

class MessageService {
  constructor() {
    this.messages = new MongoService().db.collection("messages");
  }

  async sendMessage(from, to, message) {
    await this.messages.insertOne({
      from: ObjectId(from),
      to: ObjectId(to),
      message,
      createdDate: new Date()
    });
  }

  async fetchMessages(from, to) {
    const messages = (await this.messages.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "from",
          foreignField: "_id",
          as: "from"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "to",
          foreignField: "_id",
          as: "to"
        }
      },
      {
        $project: {
          from: { "$arrayElemAt": [ "$from", 0 ] },
          to: { "$arrayElemAt": [ "$to", 0 ] },
          message: 1,
          createdDate: 1
        }
      },
      {
        $match: {
          $or: [
            {
              "from._id": ObjectId(from),
              "to._id": ObjectId(to)
            },
            {
              "from._id": ObjectId(to),
              "to._id": ObjectId(from)
            }
          ]
        }
      },
      {
        $project: {
          isMe: {
            $cond: {
              if: { $eq: ["$from._id", ObjectId(from)] },
              then: true,
              else: false
            }
          },
          from: 1,
          to: 1,
          message: 1,
          createdDate: 1
        }
      }
    ]))
      .sort({
        createdDate: 1
      })
      .toArray();
    return messages;
  }
}

module.exports = MessageService;
