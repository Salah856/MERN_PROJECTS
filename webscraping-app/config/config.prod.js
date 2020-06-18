const port = 80;

const config = {
  prod: true,
  server: {
    db: {
      url: "mongodb://127.0.0.1:27017",
      name: "webscraping-app-db"
    },
    port,
    webscrape: {
      targetUrl: "https://blog.displaycontent.biz"
    },
    webhook: {
      targetUrl: "http://127.0.0.1:8082/api/webhook"
    }
  },
  client: {
    apiUrl: "https://displaycontent.biz/api",
    sockjsUrl: "https://displaycontent.biz/echo"
  }
};

module.exports = config;
