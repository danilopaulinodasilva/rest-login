const express = require('express'),
      routes  = express.Router();

const LoginController = require('../app/controllers/LoginController');
const LogController = require("../app/controllers/LogController");

routes
    .post('/login', LoginController.login)
    .post('/auth', LoginController.auth)
    .post('/token', LoginController.token)
    .delete('/logout', LoginController.logout)
    
    .post('/log', LogController.login)
    .post('/page', LogController.page)
    .post('/download', LogController.download)

module.exports = routes;
