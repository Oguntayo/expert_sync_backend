const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
    const validSchema = Object.assign({}, schema);
    const object = Object.keys(validSchema).reduce((obj, key) => {
        if (Object.prototype.hasOwnProperty.call(req, key)) {
            obj[key] = req[key];
        }
        return obj;
    }, {});

    const { value, error } = Joi.object(validSchema)
        .prefs({ errors: { label: 'key' }, abortEarly: false })
        .validate(object);

    if (error) {
        error.isJoi = true;
        return next(error);
    }
    Object.assign(req, value);
    return next();
};

module.exports = validate;
