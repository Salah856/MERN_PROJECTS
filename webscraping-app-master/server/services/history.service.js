/*
 * File: history.service.js
 * Project: webscraping-app
 * File Created: Saturday, 20th July 2019 12:04:59 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Saturday, 20th July 2019 12:05:06 am
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

const MongoService = require("./mongo.service");

class HistoryService {
  constructor() {
    this.history = new MongoService().db.collection("history");
  }

  async setHistory(history) {
    await this.history.insertOne(history);
  }

}

module.exports = HistoryService;
