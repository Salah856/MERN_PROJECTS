/*
 * File: feed.js
 * Project: webscraping-app
 * File Created: Thursday, 20th June 2019 3:46:36 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Thursday, 20th June 2019 3:46:43 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

const WebscrapingService = require("../../services/webscraping.service");
const SockjsService = require("../../services/sockjs.service");

module.exports = async app => {
  const webscrapingService = new WebscrapingService();
  const sockjsService = new SockjsService();
  /**
   * @api {put} /api/webscraping/start Start Webscraping
   * @apiVersion 1.0.0
   * @apiName startWebscraping
   * @apiGroup Webscraping
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {String} message Returns message results.
   */
  app.put(
    "/api/webscraping/start",
    async (req, res) => {
      try {
        sockjsService.sendMessage("Webscraping Started.");
        webscrapingService.setNewWebscrapingTask(true);
        res.json({
          success: true,
          message: "Add Webscraping Success!"
        });
      } catch (err) {
        res.json({
          success: false,
          message: err.message
        });
      }
    }
  );
  /**
   * @api {put} /api/webscraping/stop Stop Webscraping
   * @apiVersion 1.0.0
   * @apiName stopWebscraping
   * @apiGroup Webscraping
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {String} message Returns message results.
   */
  app.put(
    "/api/webscraping/stop",
    async (req, res) => {
      try {
        await webscrapingService.stopWebscraping();
        sockjsService.sendMessage("Webscraping Stopped.");
        res.json({
          success: true,
          message: "Add Webscraping Success!"
        });
      } catch (err) {
        res.json({
          success: false,
          message: err.message
        });
      }
    }
  );
};
