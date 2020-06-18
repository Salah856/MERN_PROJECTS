<p align="center">

  <img alt="efba logo" src="https://res.cloudinary.com/disktjhg8/image/upload/v1559794678/eduonix-logo-light.png" width="200px" />

</p>
<h2 align="center">User Management App</h2>

<p align="center">
  This is an example project for Eduonix
</p>
<hr>

## Requirements

- [Node.js](https://nodejs.org/en/) 6+
- [MongodDB](https://www.mongodb.com/download-center/community) 4+
- [Docker](https://docs.docker.com/install/) 18+
- [Docker Compose](https://docs.docker.com/compose/install/) 1+

### [Live-Demo](https://user-management.displaycontent.biz)

### [Live-Api-Documentation](https://user-management.displaycontent.biz/api/documentation)

## Getting Started
- ##### Clone the project
- ##### Install the Dependencies
```
$ npm i
```
- ##### Start MongoDB if you will use Local Node
- ##### Run the server in Docker Node
```
$ npm start
```
- ##### Run the server in Local Node
```
$ npm run start:wo-docker
```
- ##### Run the server using Mock Backend in Docker Node
```
$ npm run start:mock
```
- ##### Run the server using Mock Backend in Local Node
```
$ npm run start:mock:wo-docker
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

## NPM Scripts

| script                              | description                                 |
|-------------------------------------|---------------------------------------------|
| `npm i`                             | install dependencies                        |
| `npm run start:wo-docker`           | start dev server with Local Node            |
| `npm run start:mock`                | start mock server with Docker               |
| `npm run start:mock:wo-docker`      | start mock server with Local Node           |
| `npm start`                         | start dev server with Docker                |
| `npm run start:dev`                 | start dev server with Docker                |
| `npm run start:prod`                | start production server with Docker         |
| `npm run build:prod`                | build server with prod config               |
| `npm run build:doc:api`             | build documentation API                     |
| `npm run lint`                      | use eslint to check for code errors         |
| `npm run lint --fix`                | use eslint to fix code errors               |
| `npm run docker:start`              | initialize docker instance                  |
| `npm run docker:stop`               | removes docker instance                     |
| `npm run docker:restart`            | restart docker instance                     |
| `npm run set:config:mock`           | sets configuration to mock                  |
| `npm run set:config:dev`            | sets configuration to dev                   |
| `npm run set:config:prod`           | sets configuration to production            |

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
