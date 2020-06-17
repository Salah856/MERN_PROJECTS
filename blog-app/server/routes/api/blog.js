/*
 * File: feed.js
 * Project: blog-app
 * File Created: Thursday, 20th June 2019 3:46:36 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Thursday, 20th June 2019 3:46:43 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

const BlogService = require("../../services/blog.service");
const AuthMiddleware = require("../../middleware/auth.middleware");
const UserMiddleware = require("../../middleware/user.middleware");

module.exports = async app => {
  const blogService = new BlogService();
  /**
   * @api {add} /api/feed/add Blog
   * @apiVersion 1.0.0
   * @apiName addBlog
   * @apiGroup Blog
   *
   * @apiHeader {String} authorization Bearer Token.
   *
   * @apiParam {String} title title of the blog
   * @apiParam {String} subTitle short description of the blog
   * @apiParam {String} backgroundPicture wallpaper picture for the blog
   * @apiParam {String} content the contents of the blog
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {String} message Returns message results.
   */
  app.post(
    "/api/blog/add",
    AuthMiddleware,
    UserMiddleware,
    async (req, res) => {
      try {
        await blogService.addBlog(res.user._id, req.body.blog);
        res.json({
          success: true,
          message: "Add Blog Success!"
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
   * @api {update} /api/feed/update Blog
   * @apiVersion 1.0.0
   * @apiName updateBlog
   * @apiGroup Blog
   *
   * @apiHeader {String} authorization Bearer Token.
   *
   * @apiParam {String} title title of the blog
   * @apiParam {String} subTitle short description of the blog
   * @apiParam {String} backgroundPicture wallpaper picture for the blog
   * @apiParam {String} content the contents of the blog
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {String} message Returns message results.
   */
  app.post(
    "/api/blog/update",
    AuthMiddleware,
    UserMiddleware,
    async (req, res) => {
      try {
        await blogService.updateBlog(res.user._id, req.body.blog._id, req.body.blog);
        res.json({
          success: true,
          message: "Update Blog Success!"
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
   * @api {get} /api/user/blog/list Fetch User Blogs
   * @apiVersion 1.0.0
   * @apiName fetchUserBlogs
   * @apiGroup Blog
   *
   * @apiHeader {String} authorization Bearer Token.
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {Object} data Contains the blogs information.
   * @apiSuccess {Array} data.blogs Array of Blogs with their information.
   * @apiSuccess {String} message Returns message results.
   */
  app.get(
    "/api/user/blog/list",
    AuthMiddleware,
    UserMiddleware,
    async (req, res) => {
      try {
        let userBlogs = await blogService.getUserBlogs(res.user._id);
        res.json({
          success: true,
          data: {
            userBlogs
          },
          message: "Fetch User Blogs Success!"
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
   * @api {get} /api/user/blog/:blogId Fetch User Blog
   * @apiVersion 1.0.0
   * @apiName fetchUserBlogs
   * @apiGroup Blog
   *
   * @apiHeader {String} authorization Bearer Token.
   * 
   * @apiParam {String} blogId id of the blog
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {Object} data Contains the blog information.
   * @apiSuccess {Array} data.blogs information of the blog
   * @apiSuccess {String} message Returns message results.
   */
  app.get(
    "/api/user/blog/:blogId",
    AuthMiddleware,
    UserMiddleware,
    async (req, res) => {
      try {
        let userBlog = await blogService.getUserBlog(res.user._id, req.params.blogId);
        res.json({
          success: true,
          data: {
            userBlog
          },
          message: "Fetch User Blog Success!"
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
   * @api {delete} /api/user/blog/delete/:blogId Delete User Blog
   * @apiVersion 1.0.0
   * @apiName fetchUserBlogs
   * @apiGroup Blog
   *
   * @apiHeader {String} authorization Bearer Token.
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {String} message Returns message results.
   */
  app.delete(
    "/api/user/blog/delete/:blogId",
    AuthMiddleware,
    UserMiddleware,
    async (req, res) => {
      try {
        await blogService.deleteUserBlog(res.user._id, req.params.blogId);
        res.json({
          success: true,
          message: "Delete User Blog Success!"
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
   * @api {post} /api/blog/list Fetch Blogs
   * @apiVersion 1.0.0
   * @apiName fetchBlogs
   * @apiGroup Blog
   *
   * @apiHeader {String} authorization Bearer Token.
   * 
   * @apiParam {String} options used for paging.
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {Object} data Contains the blogs information.
   * @apiSuccess {Array} data.blogs Array of Blogs with their information.
   * @apiSuccess {String} message Returns message results.
   */
  app.post(
    "/api/blog/list",
    async (req, res) => {
      try {
        let blogs = await blogService.getBlogs(req.body.options);
        res.json({
          success: true,
          data: {
            blogs
          },
          message: "Fetch Blogs Success!"
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
   * @api {get} /api/blog/:blogId Fetch Blog
   * @apiVersion 1.0.0
   * @apiName fetchBlogs
   * @apiGroup Blog
   *
   * @apiHeader {String} authorization Bearer Token.
   * 
   * @apiParam {String} blogId id of the blog
   *
   * @apiSuccess {Boolean} success Returns true if success, false if not.
   * @apiSuccess {Object} data Contains the blog information.
   * @apiSuccess {Array} data.blogs information of the blog
   * @apiSuccess {String} message Returns message results.
   */
  app.get(
    "/api/blog/:blogId",
    async (req, res) => {
      try {
        let blog = await blogService.getBlog(req.params.blogId);
        res.json({
          success: true,
          data: {
            blog
          },
          message: "Fetch Blog Success!"
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
