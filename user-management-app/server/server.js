/*
 * File: server.js
 * Project: user-management
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 2:41:40 pm
 * Modified By: Matthew Raymer (matthew.raymer@anomalistdesign.com>)
 * -----
 * Copyright 2019, ADDLC
 */

(async () => {
  /*
   * Dependencies, Modules, Libraries, Pacakages
   */
  const express = require("express");
  const historyApiFallback = require("connect-history-api-fallback");
  const path = require("path");
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const webpackConfig = require("../webpack.config");
  const config = require("../config/config");
  const isDev = !config.prod;
  const port = config.server.port;
  const MongoService = require("./services/mongo.service");
  const JwtService = require("./services/jwt.service");
  const EmailService = require("./services/email.service");
  const AdminService = require("./services/admin.service");

  /*
   * Configuration
   */
  await new MongoService().connect(config.server.db.url, config.server.db.name);
  await new EmailService().setConfig(config.server.email);
  new JwtService().setConfig(config.server.jwt.secretkey);

  /*
   * Create default Admin
   */
  const adminService = new AdminService();
  await adminService.createAdmin({
    fullname: "Admin",
    email: "admin@admin.com",
    password: "password"
  });

  /*
   * Init Express
   */
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  /*
   * API routes
   */
  require("./routes")(app);
  app.use(
    "/api/documentation",
    express.static(path.join(__dirname, "../documentation"))
  );

  if (isDev) {
    /*
     * Set dev server
     */
    const compiler = webpack(webpackConfig);
    app.use(
      historyApiFallback({
        verbose: false
      })
    );
    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        contentBase: path.resolve(__dirname, "../client/public"),
        stats: {
          colors: true,
          hash: false,
          timings: true,
          chunks: false,
          chunkModules: false,
          modules: false
        }
      })
    );
    app.use(webpackHotMiddleware(compiler));
    app.use(express.static(path.resolve(__dirname, "../dist")));
  } else {
    /*
     * Set prod server
     */
    app.use(express.static(path.resolve(__dirname, "../dist")));
    app.get("*", function(req, res) {
      res.sendFile(path.resolve(__dirname, "../dist/index.html"));
    });
  }

  /*
   * Start the server
   */
  app.listen(port, "0.0.0.0", err => {
    if (err) {
      console.log(err);
    }

    console.info(">>> 🌎 Open http://127.0.0.1:%s/ in your browser.", port);
  });

  module.exports = app;
})();
