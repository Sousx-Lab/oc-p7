
class HandleTemplateError extends Error {
    constructor(message) {
        super(message);
        this.name = "HandleTemplateError";
      }
}

module.exports = HandleTemplateError;