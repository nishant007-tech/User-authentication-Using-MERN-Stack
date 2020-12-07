const Joi = require('joi');
//Validation

function registerValidationSchema(data) {

    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
}

function loginValidationSchema(data) {

    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
}

module.exports.registerValidationSchema = registerValidationSchema;
module.exports.loginValidationSchema = loginValidationSchema;