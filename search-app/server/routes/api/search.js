/*
 * File: search.js
 * Project: search-app
 * File Created: Thursday, 20th June 2019 3:46:36 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Thursday, 20th June 2019 3:46:43 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

const FeedService = require("../../services/feed.service");
const KeywordService = require("../../services/keyword.service");

module.exports = async app => {
  const feedService = new FeedService();
  const keywordService = new KeywordService();
  /**
   * @api {post} /api/search/feeds Fetch Feeds
   * @apiVersion 1.0.0
   * @apiName fetchFeeds
   * @apiGroup Search
   *
   * @apiParam {String} options used for paging.
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {Object} data Contains the feeds information.
   * @apiSuccess {Array} data.feeds Array of Feeds with their information.
   * @apiSuccess {String} message Returns message results.
   */
  app.post(
    "/api/search/feeds",
    async (req, res) => {
      try {
        let feeds = await feedService.searchFeeds(req.body.options);
        res.json({
          success: true,
          data: {
            feeds
          },
          message: "Fetch Feeds Success!"
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
   * @api {post} /api/search/suggestions Fetch Suggestions
   * @apiVersion 1.0.0
   * @apiName fetchSuggestions
   * @apiGroup Search
   *
   * @apiParam {String} keyword used for filtering suggestions
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {Object} data Contains the feeds information.
   * @apiSuccess {Array} data.suggestions Array of Suggestions.
   * @apiSuccess {String} message Returns message results.
   */
  app.post(
    "/api/search/suggestions",
    async (req, res) => {
      try {
        let suggestions = await keywordService.searchSuggestions(req.body.keyword);
        res.json({
          success: true,
          data: {
            suggestions
          },
          message: "Fetch Suggestions Success!"
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
