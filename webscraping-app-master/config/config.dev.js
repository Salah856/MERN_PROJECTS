const port = 8081;

const config = {
  prod: false,
  server: {
    db: {
      url: "mongodb://127.0.0.1:27018",
      name: "webscraping-app-db"
    },
    port,
    webscrape: {
      targetUrl: "http://127.0.0.1:8080"
    },
    webhook: {
      targetUrl: "http://127.0.0.1:8082/api/webhook"
    }
  },
  client: {
    apiUrl: "http://127.0.0.1:" + port + "/api",
    sockjsUrl: "http://127.0.0.1:" + port + "/echo"
  }
};

module.exports = config;
