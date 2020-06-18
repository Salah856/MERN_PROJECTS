const port = 8082;

const config = {
  prod: true,
  server: {
    db: {
      url: "mongodb://127.0.0.1:27017",
      name: "search-app-db"
    },
    port
  },
  client: {
    apiUrl: "https://displaycontent.biz/api"
  }
};

module.exports = config;
