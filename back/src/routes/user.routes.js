const express = require('express');
const userController = require('../controllers/user.controller');
const { xss } = require('express-xss-sanitizer');
const JsonSchemaValidator = require('../middlewares/validator/api/json.schema.validator');
const {signupSchema}= require('../middlewares/validator/api/signup.schema');
const {loginSchema} = require('../middlewares/validator/api/login.schema');
const auth = require('../middlewares/security/auth');

const router = express.Router();

/** Authentification Routes */
router.post('/signup', xss(), JsonSchemaValidator(signupSchema), userController.signup);
router.post('/login',xss(), JsonSchemaValidator(loginSchema), userController.login);
router.get('/refresh-token',auth , userController.refreshToken);

module.exports = router;