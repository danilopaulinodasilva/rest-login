const express = require('express');
const routes = require('./routes');
const error = require('./error');
const cors = require('cors');

class Server {

    constructor() {
        this.server = express();
        this.cors();
        this.middlewares();
        this.errors();
        this.routes();
    }
    
    middlewares() {
        this.server.use(express.json());
    }

    cors() {
        this.server.use(cors());
    }

    errors() {
        this.server.use(error);
    }

    routes() {
        this.server.use(routes);
    }

}

module.exports = new Server().server;
