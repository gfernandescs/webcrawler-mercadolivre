const router = require('express').Router();
const IndexController = require('./app/controllers/index-controller');
const routeValidatorMiddleware = require('./app/middlewares/express/route-validator-middleware');

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
        this._routeValidator = async (req, res, next) => {
            await routeValidatorMiddleware.validate(req, res, next);
        };

        this.routes.post('/search-products', [this._routeValidator], (req, res, next) => IndexController.searchProducts(req, res, next));
    }
}

module.exports = new Routes();
