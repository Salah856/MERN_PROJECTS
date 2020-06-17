const port = 80;

const config = {
  prod: true,
  server: {
    db: {
      url: "mongodb://127.0.0.1:27017",
      name: "blog-app-db"
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
    apiUrl: "https://displaycontent.biz/api"
  }
};

module.exports = config;