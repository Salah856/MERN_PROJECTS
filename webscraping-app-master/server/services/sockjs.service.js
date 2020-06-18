/*
 * File: sockjs.service.js
 * Project: webscraping-app
 * File Created: Friday, 19th July 2019 11:00:06 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 19th July 2019 11:00:39 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

const sockjs = require("sockjs");
const HistoryService = require("./history.service");
const StatusService = require("./status.service");
let conn;

class sockjsService {
  constructor() {
    this.conn = conn;
    this.historyService = new HistoryService();
    this.statusService = new StatusService();
  }
  setup() {
    const sockjs_opts = {sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"};
    const sockjs_echo = sockjs.createServer(sockjs_opts);
    sockjs_echo.on("connection", (_conn) => {
      conn = _conn;
      conn.on('data', (message) => {
        if (message === "status") {
          conn.write(this.statusService.getStatus());
        }
      });
    });
    return sockjs_echo;
  }
  sendMessage(message) {
    this.historyService.setHistory({
      message,
      createdAt: new Date()
    })
    conn.write(message);
  }
}

module.exports = sockjsService;
