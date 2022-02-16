const Joi = require('joi');

exports.loginSchema =
    Joi.object().keys({
        email: Joi.string()
            .required()
            .email()
            .messages({
                'string.base': "email must be a string",
                'any.required': "email is required",
                'string.empty': "email must not be empty",
                'string.email': "email must be an email valid",
            }),
        password: Joi
            .string()
            .required()
            .messages({
                'string.base': "password must be a string",
                'any.required': "password is required",
                'string.empty': "password must not be empty",
            })
})