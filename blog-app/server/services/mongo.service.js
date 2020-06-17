/*
 * File: mongo.service.js
 * Project: blog-app
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 3:19:47 pm
 * Modified By: Matthew Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

const MongoClient = require("mongodb").MongoClient;
let db;

class MongoService {
  constructor() {
    this.db = db;
  }

  async connect(dbUrl, dbName) {
    try {
      db = (await MongoClient.connect(dbUrl, { useNewUrlParser: true })).db(
        dbName
      );
      console.log("Connected successfully to MongoDB");
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = MongoService;
