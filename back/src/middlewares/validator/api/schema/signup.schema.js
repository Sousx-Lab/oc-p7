const Joi = require('joi');
const {isValidPassword,isHtmlTag} = require('../../validator.utils');

exports.signupSchema =
  Joi.object().keys({
        id: Joi
          .string()
          .forbidden()
          .messages({
            'any.unknown': "id is not allowed"
          }),
        email: Joi
          .string()
          .trim()
          .required()
          .email()
          .messages({
            'string.base': "email must be a string",
            'any.required': "email is required",
            'string.empty': "email must not be empty",
            'string.email': "email must be an email valid",
          }),
        firstName: Joi
          .string()
          .trim()
          .max(64)
          .custom(isHtmlTag, 'string.html')
          .required()
          .messages({
            'string.base': "firstname must be a string",
            'any.required': "firstname is required",
            'string.empty': "firstname must not be empty",
            'string.max': "firstname must have max 64 characters",
            'string.alphanum': "must only contain alpha-numeric characters"
          }),
        lastName: Joi
          .string()
          .trim()
          .max(64)
          .custom(isHtmlTag, 'string.html')
          .required()
          .messages({
            'string.base': "lastname must be a string",
            'any.required': "lastname is required",
            'string.empty': "lastname must not be empty",
            'string.max': "lastname must have max 64 characters"
          }),
        password: Joi
          .string()
          .trim()
          .custom(isValidPassword, 'password.validation')
          .required()
          .messages({
            'string.base': "password must be a string",
            'any.required': "password is required",
            'string.empty': "password must not be empty",
          })
  });