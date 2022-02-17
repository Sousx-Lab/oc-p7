const express = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../config/swagger/openapi.json');

const router = express.Router();
const swaggerOptions = {
    explorer: true
  };
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;