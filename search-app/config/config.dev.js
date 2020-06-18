const port = 8082;

const config = {
  prod: false,
  server: {
    db: {
      url: "mongodb://127.0.0.1:27019",
      name: "search-app-db"
    },
    port
  },
  client: {
    apiUrl: "http://localhost:" + port + "/api"
  }
};

module.exports = config;
