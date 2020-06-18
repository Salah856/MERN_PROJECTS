const port = 8080;

const config = {
  prod: true,
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
    apiUrl: "http://155.138.220.242:8080/api",
    mock: false
  }
};

module.exports = config;