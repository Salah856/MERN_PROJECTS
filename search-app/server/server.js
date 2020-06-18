/*
 * File: server.js
 * Project: search-app
 * File Created: Wednesday, 5th June 2019 12:51:27 am
 * Author: Matthew Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 2:41:40 pm
 * Modified By: Matthew Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
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
  var bodyParser = require('body-parser');
  const MongoService = require("./services/mongo.service");

  /*
   * Configuration
   */
  await new MongoService().connect(config.server.db.url, config.server.db.name);

  /*
   * Init Express
   */
  const app = express();
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

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
