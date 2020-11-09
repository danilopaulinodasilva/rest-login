const express = require('express'),
      routes  = express.Router();

const LoginController = require('../app/controllers/LoginController');
const LogMiddleware = require("../middleware/log");

routes
    .post('/login', LoginController.login)
    .post('/auth', LoginController.auth)
    .post('/token', LogMiddleware, LoginController.token)
    .delete('/logout', LoginController.logout);

module.exports = routes;
