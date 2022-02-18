const Joi = require('joi');

class SchemaValidator{
  constructor(req, res, next){
    this.req = req,
    this.res = res,
    this.next = next
  }

  /**
   * @param {object} schema 
   */
  query(schema){
    const { error } = schema.validate(this.req.query, {escapeHtml: true, abortEarly: false })
    this.handleError(error)
  }
  
  /**
   * @param {object} schema 
   */
  body(schema){
    const { error } = schema.validate(this.req.body, {escapeHtml: true, abortEarly: false })
    this.handleError(error)
  }

  handleError(error){
    const valid = error == null; 
    if (valid) {
      this.next();
    } else {
      const {details} = error;
      const jsonError = {validationError : {}};

      details.map(e => {
        jsonError.validationError[e.path[0]] = {
          message: e.message.replace(/\"/g, ''),
          context: e.context,
          type: e.type
        }
      });
      return this.res.http.BadRequest(jsonError);
    }
  }
}
module.exports = {
  body: (schema) => {
    return(req, res, next) => {
      const validator = new SchemaValidator(req, res, next)
      validator.body(schema)
    }
  },
  query:(schema) => {
    return(req, res, next) => {
      const validator = new SchemaValidator(req, res, next)
      validator.body(schema)
    }
  }
}