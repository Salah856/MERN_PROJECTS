/*
 * File: webscraping.service.js
 * Project: webscraping-app
 * File Created: Friday, 19th July 2019 12:54:20 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 19th July 2019 11:00:43 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Copyright 2019, ADLLC
 */

const puppeteer = require("puppeteer");
const SockjsService = require("./sockjs.service");
const StatusService = require("./status.service");
const FeedService = require("./feed.service");
const config = require("../../config/config");
let webscrapeStopped = true;
let webscrapeTask;

class WebscrapingService {
  constructor() {
    this.sockjsService = new SockjsService();
    this.feedService = new FeedService();
    this.statusService = new StatusService();
  }

  isActive() {
    return !webscrapeStopped;
  }

  async startWebscraping() {
    this.sockjsService.sendMessage("Webscraping in progress...");
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();
    await page.goto(config.server.webscrape.targetUrl);
    const getFeeds = async () => {
      try {
        return await page.evaluate(`(() => {
          const _feeds = document.querySelector("#app > div:nth-child(3) > div > div").getElementsByClassName("post-preview");
          const feeds = [];
          for (let i = 0; i < _feeds.length; i++) {
            feeds.push({
              link: location.href + _feeds.item(i).getElementsByTagName("a").item(0).getAttribute("href").substr(1),
              title: _feeds.item(i).getElementsByClassName('post-title').item(0).innerText,
              subtitle: _feeds.item(i).getElementsByClassName('post-subtitle').item(0).innerText,
              meta: _feeds.item(i).getElementsByClassName('post-meta').item(0).innerText
            })
          }
          return feeds;
        })()`);
      } catch (err) {
        return [];
      }
    };

    let finished = false;

    let feeds = [];
    while (!finished) {
      await page.waitFor(1000);
      const newFeeds = await getFeeds();
      const _feeds = feeds.concat(newFeeds);
      try {
        await page.click(
          "#app > div:nth-child(3) > div > div > div.clearfix > a.btn.btn-primary.float-right"
        );
      } catch (err) {
        finished = true;
      }
      if (!finished) {
        for (const i in newFeeds) {
          await this.feedService.setFeed({
            link: newFeeds[i].link,
            meta: {
              title: newFeeds[i].title,
              subtitle: newFeeds[i].subtitle,
              meta: newFeeds[i].meta
            }
          });
        }
        feeds = _feeds;
      }
    }
    await browser.close();
    this.sockjsService.sendMessage(
      "Webscraping have finished. Scraped a total of " +
        feeds.length +
        " feed/s."
    );
    this.setNewWebscrapingTask();
  }

  async stopWebscraping() {
    this.purgeWebscrapeTask();
    this.statusService.setStatus("off");
    webscrapeStopped = true;
  }

  purgeWebscrapeTask() {
    if (webscrapeTask !== undefined) {
      clearTimeout(webscrapeTask);
      webscrapeTask = null;
    }
  }

  async setNewWebscrapingTask(startImmediately) {
    if (startImmediately) {
      this.statusService.setStatus("on");
      webscrapeStopped = false;
      await this.startWebscraping();
    } else {
      if (!webscrapeStopped) {
        this.statusService.setStatus("on");
        this.sockjsService.sendMessage(
          "New Webscrape Task Created. Scheduled to run in a minute."
        );
        webscrapeTask = setTimeout(async () => {
          if (!webscrapeStopped) {
            await this.startWebscraping();
          }
        }, 60000);
      } else {
        this.statusService.setStatus("off");
      }
    }
  }
}

module.exports = WebscrapingService;
