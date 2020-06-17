<p align="center">

  <img alt="efba logo" src="./client/public/assets/img/eduonix-logo-dark.png" width="200px" />

</p>
<h2 align="center">Blog App</h2>

<p align="center">
  This is an example project for Company
</p>
<hr>

## Requirements

- [Node.js](https://nodejs.org/en/) 6+ (I have used v10.15.1)
- [MongodDB](https://www.mongodb.com/download-center/community) 4+

### [Live-Demo](https://blog-app.displaycontent.biz)

### [Live-Api-Documentation](https://blog-app.displaycontent.biz/api/documentation)

## Getting Started
- ##### Clone the project
- ##### Install the Dependencies
```
$ npm i
```
- ##### Run MongoDB Server (port should be on 27017)
- ##### Run the server
```
$ npm run start:wo-docker
```
- ##### Navigate to http://127.0.0.1:8080

## Run with Docker
- ##### Clone the project
- ##### Install the Dependencies
```
$ npm i
```
- ##### Run the server
```
$ npm start
```
- ##### Navigate to http://127.0.0.1:8080

## Default Admin Credentials
- ##### admin@admin.com : password

## Look for the `config/config.dev.js` or `config/config.prod.js` for making changes in the configs of the project
- Edit the `'pwd'`/config/config.dev.js to make changes for dev configuration

- Edit the `'pwd'`/config/config.prod.js to make changes for prod configuration

- Edit the `'pwd'`/client/app to make changes in the client

- Edit the `'pwd'`/server to make changes in the server

## Look for the Documentation in the `documentation`
- ##### Install the Dependencies
```
$ npm i
```
- ##### Build Documentation
```
$ npm run build:doc:api
```

## NPM Commands

| command                             | description                        |
|-------------------------------------|------------------------------------|
| `npm i`                             | install dependencies               |
| `npm start`                         | start developmental server         |
| `npm run start:dev`                 | start developmental server         |
| `npm run start:prod`                | start production server            |
| `npm run docker:init`               | initialize docker instance         |
| `npm run docker:rm`                 | remove docker instance             |
| `npm run docker:restart`            | restart docker instance            |

## Technology
- NodeJS - Server
- ExpressJS - Nodejs framework
- MongoDB - Database
- ReactJS - Frontend
- Docker - Containerization and image
- Eslint - Linter
- Webpack - Bundler
- Babel - Loader and Compiler/Transpiler

## Features
- Login using JWT
- Registration with nodemailer
- CRUD operations for Users
- Role based system APIs
