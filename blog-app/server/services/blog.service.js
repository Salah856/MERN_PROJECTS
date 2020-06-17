/*
 * File: blog.service.js
 * Project: blog-app
 * File Created: Monday, 15th July 2019 12:14:28 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Wednesday, 17th July 2019 12:50:14 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

const MongoService = require("./mongo.service");
const ObjectId = require("mongodb").ObjectId;

class BlogService {
  constructor() {
    this.blogs = new MongoService().db.collection("blogs");
  }

  async addBlog(userId, blog) {
    await this.blogs.insertOne({
      userId: ObjectId(userId),
      title: blog.title,
      subTitle: blog.subTitle,
      backgroundPicture: blog.backgroundPicture,
      content: blog.content,
      createdDate: new Date(),
      updatedDate: new Date()
    });
  }

  async updateBlog(userId, blogId, blog) {
    await this.blogs.update(
      {
        _id: ObjectId(blogId),
        userId: ObjectId(userId)
      },
      {
        $set: {
          title: blog.title,
          subTitle: blog.subTitle,
          backgroundPicture: blog.backgroundPicture,
          content: blog.content,
          updatedDate: new Date()
        }
      }
    );
  }

  async getUserBlogs(userId) {
    const blogs = await (await this.blogs.aggregate([
      {
        $match: {
          "userId": ObjectId(userId)
        }
      }
    ]))
      .sort({
        createdDate: -1
      })
      .toArray();
    return blogs;
  }
  async getUserBlog(userId, blogId) {
    const blog = await this.blogs.findOne({
      _id: ObjectId(blogId),
      userId: ObjectId(userId)
    });
    return blog;
  }
  async deleteUserBlog(userId, blogId) {
    return await this.blogs.deleteOne({
      _id: ObjectId(blogId),
      userId: ObjectId(userId)
    });
  }
  async getBlogs(options) {
    const blogs = await (await this.blogs.aggregate([
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
          title: 1,
          subTitle: 1,
          backgroundPicture: 1,
          content: 1,
          createdDate: 1
        }
      }
    ]))
      .sort({
        createdDate: -1
      })
      .skip(options.skip)
      .limit(options.limit)
      .toArray();
    return blogs;
  }
  async getBlog(blogId) {
    const blogs = await (await this.blogs.aggregate([
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
          title: 1,
          subTitle: 1,
          backgroundPicture: 1,
          content: 1,
          createdDate: 1
        }
      },
      {
        $match: {
          "_id": ObjectId(blogId)
        }
      }
    ]))
      .toArray();
    return blogs[0];
  }
}

module.exports = BlogService;
