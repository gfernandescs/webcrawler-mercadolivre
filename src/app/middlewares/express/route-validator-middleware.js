class RouteValidatorMiddleware {

    constructor() {
        this._joi = require('@hapi/joi');
    }

    async validate(req, res, next) {
        try {
            const schema = this._joi.object({
                search: this._joi.string().required(),
                limit: this._joi.number().min(1).required()
            });

            const validate = schema.validate(req.body);

            if (validate.error) {
                throw validate.error;
            }

            next();
        } catch (e) {
            res.status(422).json({
                message: e.message,
                stack: {
                    name: e.name
                }
            });
        }
    }
}

module.exports = new RouteValidatorMiddleware();