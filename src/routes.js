const router = require('express').Router();
const IndexController = require('./app/controllers/index-controller');

const indexRoutes = Symbol('indexRoutes');

/**
 *
 *
 * @class Routes
 */
class Routes {
    constructor() {
        this._routes = router;

        this[indexRoutes]();
    }

    /**
     *
     * @returns {*}
     */
    get routes() {
        return this._routes;
    }

    [indexRoutes]() {
        this.routes.post('/search-products', (req, res, next) => IndexController.searchProducts(req, res, next));
    }
}

module.exports = new Routes();
