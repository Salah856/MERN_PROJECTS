/*
 * File: feed.service.js
 * Project: webscraping-app
 * File Created: Saturday, 20th July 2019 1:54:17 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Saturday, 20th July 2019 1:54:37 am
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

const MongoService = require("./mongo.service");
const SockjsService = require("./sockjs.service");
const WebhookService = require("./webhook.service");

class FeedService {
  constructor() {
    this.feeds = new MongoService().db.collection("feeds");
    this.sockjsService = new SockjsService();
    this.webhookService = new WebhookService();
  }

  async setFeed(feed) {
    if (feed.link !== undefined) {
      const isFeedExist = await this.countFeeds({
        link: feed.link
      });
      if (isFeedExist === 0) {
        await this.feeds.insertOne({
          link: feed.link,
          meta: feed.meta,
          updatedAt: new Date()
        });
        this.sockjsService.sendMessage("New Feed Found: " + JSON.stringify(feed));
      } else {
        await this.feeds.updateOne(
          {
            link: feed.link
          },
          {
            $set: {
              link: feed.link,
              meta: feed.meta,
              updatedAt: new Date()
            }
          }
        );
        this.sockjsService.sendMessage("Feed Updated: " + JSON.stringify(feed));
      }
      this.webhookService.sendFeed(feed);
    }
  }

  async getFeeds(feed) {
    return await (await this.feeds.find(feed)).toArray();
  }

  async countFeeds(feed) {
    return await this.feeds.count(feed);
  }
}

module.exports = FeedService;
