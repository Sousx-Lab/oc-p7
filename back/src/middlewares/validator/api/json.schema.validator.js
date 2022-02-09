const Joi = require('joi'); 
const JsonSchemaValidator = (schema, property) => { 
    return (req, res, next) => { 
      const { error } = schema.validate(req.body, {escapeHtml: true, abortEarly: false })
      const valid = error == null; 
      if (valid) {
        next();
      } else {
        const {details} = error;
        const jsonError = {validationError : {}};
        details.map(e => {

          jsonError.validationError[e.path[0]] = {
            message: e.message.replace(/\/ /g, ''),
            context: e.context,
            type: e.type
          }
        });
        return res.http.BadRequest(jsonError);
      }
  }
} 
module.exports = JsonSchemaValidator