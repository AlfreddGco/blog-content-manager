# Content manager (blogs and news)
This is a backend and frontend content manager written in vue, express and mongodb. The backend has it's own api so you can retrieve blogs and news when you call it from an external app

### Installation

In the server directory:
```sh
$ npm install
```
In the client directory:
```sh
$ npm install
```
And that's it!

### Client config (vue)
You can configure the frontend in the [vue.config.js](client/vue.config.js) file, where you can manage backend host and api url endpoints.
### Backend config (express)
You must configure your mongodb info in the [config.js](server/config.js) file, setting user, password, name, host, and port of your mongod database.

### Run
Be sure to have your mongo database up and running
In the server directory:
```sh
$ npm run start
```
In the client directory:
```sh
$ npm run serve
```

### Development
Want to contribute? This is a simple project with very few code and easy to understand. I will be pending of any commit request you make!
