/*
 * File: people.js
 * Project: social-network-app
 * File Created: Wednesday, 12th June 2019 1:56:32 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Wednesday, 12th June 2019 1:56:52 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADDLC
 */

const PeopleService = require("../../services/people.service");
const AuthMiddleware = require("../../middleware/auth.middleware");
const UserMiddleware = require("../../middleware/user.middleware");

module.exports = async app => {
  const peopleService = new PeopleService();
  /**
   * @api {get} /api/people Fetch People
   * @apiVersion 1.0.0
   * @apiName fetchPeople
   * @apiGroup People
   *
   * @apiHeader {String} authorization Bearer Token.
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {Object} data Contains the people information.
   * @apiSuccess {Array} data.people Array of People with their information.
   * @apiSuccess {String} message Returns message results.
   */
  app.get(
    "/api/people",
    AuthMiddleware,
    UserMiddleware,
    async (req, res) => {
      try {
        const people = await peopleService.fetchAll(res.user._id);
        res.json({
          success: true,
          data: {
            people
          },
          message: "User Fetch Success!"
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
   * @api {post} /api/people/search Search People
   * @apiVersion 1.0.0
   * @apiName searchPeople
   * @apiGroup People
   *
   * @apiHeader {String} authorization Bearer Token.
   * 
   * @apiParam {String} keyword Search String.
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {Object} data Contains the people information.
   * @apiSuccess {Array} data.people Array of People with their information.
   * @apiSuccess {String} message Returns message results.
   */
  app.post(
    "/api/people/search",
    AuthMiddleware,
    UserMiddleware,
    async (req, res) => {
      try {
        const people = await peopleService.searchPeople(res.user._id, req.body.keyword);
        res.json({
          success: true,
          data: {
            people
          },
          message: "User Search Success!"
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
