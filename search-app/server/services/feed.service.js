/*
 * File: feed.service.js
 * Project: search-app
 * File Created: Saturday, 20th July 2019 1:54:17 am
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Saturday, 20th July 2019 1:54:37 am
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

const MongoService = require("./mongo.service");
const KeywordService = require("./keyword.service");

class FeedService {
  constructor() {
    this.feeds = new MongoService().db.collection("feeds");
    this.keywordService = new KeywordService();
  }

  async setFeed(feed) {
    if (feed.link !== undefined) {
      const isFeedExist = await this.countFeeds({
        link: feed.link
      });
      feed.keywords = this.keywordService
        .generateKeywords(feed.meta.title)
        .concat(this.keywordService.generateKeywords(feed.meta.subtitle));
      this.keywordService.setKeywords(feed.keywords);
      if (isFeedExist === 0) {
        await this.feeds.insertOne({
          link: feed.link,
          meta: feed.meta,
          keywords: feed.keywords,
          updatedAt: new Date()
        });
      } else {
        await this.feeds.updateOne(
          {
            link: feed.link
          },
          {
            $set: {
              link: feed.link,
              meta: feed.meta,
              keywords: feed.keywords,
              updatedAt: new Date()
            }
          }
        );
      }
    }
  }

  async getFeeds(feed) {
    return await (await this.feeds.find(feed)).toArray();
  }

  async countFeeds(feed) {
    return await this.feeds.count(feed);
  }

  async searchFeeds(options) {
    const page = (options.page - 1) || 0;
    const skip = options.limit * page;
    const query = [
      {
        $match: options.keyword ? {
          keywords: {
            $in: [options.keyword]
          }
        } : {}
      },
      {
        $project: {
          link: 1,
          meta: 1
        }
      }
    ];
    const count = (await (await this.feeds.aggregate(query)).toArray()).length;
    const rows = await this.feeds.aggregate(query)
      .skip(skip)
      .limit(options.limit)
      .toArray();
    return {
      rows,
      count
    };
  }
}

module.exports = FeedService;
