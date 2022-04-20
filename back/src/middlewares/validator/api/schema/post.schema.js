const Joi = require('joi');

exports.postSchema = Joi.object().keys({
    id: Joi
      .string()
      .forbidden()
      .messages({
        'any.unknown': "id is not allowed"
    }),
    content: Joi
      .string()
      .optional()
      .allow(null, ''),
    media: Joi
      .string()
      .optional()
      .allow(null, ''),
})