const path = require('path');

require('dotenv').config({
    allowEmptyValues: false,
    path: path.resolve(__dirname, 'app/config/env/.env')
});

const express = require('express');
const router = require('./routes');

class App {
    constructor() {
        this._express = express();
        this.initMiddlewares();
        this.routes();
    }

    get express() {
        return this._express;
    }

    initMiddlewares() {
        this._express.use(express.json());
        this._express.use(express.urlencoded({extended: false}));
    }

    routes() {
        this._express.use(router.routes);
    }
}

module.exports = new App().express;