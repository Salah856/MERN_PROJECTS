const port = 8080;

const config = {
  prod: false,
  server: {
    db: {
      url: "mongodb://127.0.0.1:27017",
      name: "user-management-db"
    },
    jwt: {
      secretkey: "secretkey"
    },
    email: {
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: "theeduonix@gmail.com",
        pass: "7juxqoK44RWszIVV"
      }
    },
    port
  },
  client: {
    apiUrl: "http://127.0.0.1:" + port + "/api",
    mock: false
  }
};

module.exports = config;
