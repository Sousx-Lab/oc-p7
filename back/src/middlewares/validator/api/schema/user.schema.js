const Joi = require('joi');
const {isValidPassword,isHtmlTag} = require('../../validator.utils');

exports.signupSchema =Joi.object().keys({
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
        'string.base': "firstName must be a string",
        'any.required': "firstName is required",
        'string.empty': "firstName must not be empty",
        'string.max': "firstName must have max 64 characters",
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
      }),
    confirmPassword: Joi
      .string()
      .required()
      .valid(Joi.ref('password'))
      .messages({
        'string.base': "confirm password must be a string",
        'any.required': "confirm password is required",
        'string.empty': "password must not be empty",
        'any.only': "confirm password must be same password"
      }),
  });

exports.loginSchema = Joi.object().keys({
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
  });

exports.updateUserSchema = Joi.object().keys({
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
        'string.base': "firstName must be a string",
        'any.required': "firstName is required",
        'string.empty': "firstname must not be empty",
        'string.max': "firstName must have max 64 characters",
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
    currentPassword: Joi
      .string()
      .trim()
      .custom(isValidPassword, 'password.validation')
      .required()
      .messages({
        'string.base': "current password must be a string",
        'any.required': "current password is required",
        'string.empty': "current password must not be empty",
      }),
      confirmNewPassword: Joi
      .string()
      .when(Joi.ref('newPassword'), {
        is: Joi.exist(),
        then: Joi.valid(Joi.ref('newPassword')).required(),
      })
      .messages({
        'string.base': "confirm new password must be a string",
        'string.empty': "confirm new password must be same new password",
        'any.only': "confirm new password must be same new password"
      }),
      newPassword: Joi
      .string()
      .optional()
      .trim()
      .custom(isValidPassword, 'passwor.validation')
      .allow(null, '')
      .messages({
        'string.base': "new password must be a string",
        'any.required': "new password is required",
        'string.empty': "new password must not be empty",
      }),
      
  });

  exports.forgotPasswordSchema = Joi.object().keys({
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
  });

exports.resetPasswordSchema = Joi.object().keys({
      confirmPassword: Joi
      .any()
      .valid(Joi.ref('password'))
      .required()
      .messages({
        'string.base': "new password must be a string",
        'any.required': "new password is required",
        'string.empty': "new password must not be empty",
        'any.only': "confirm new password must be same new password"
      }),
      password: Joi
      .string()
      .trim()
      .custom(isValidPassword, 'password.validation')
      .required()
      .messages({
        'string.base': "current password must be a string",
        'any.required': "current password is required",
        'string.empty': "current password must not be empty",
      }),
      token: Joi
      .string()
      .trim()
      .required()
      .messages({
        'string.base': "token must be a string",
        'any.required': "token is required",
        'string.empty': "token must not be empty",
      })
})