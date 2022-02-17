const express = require('express');
const userController = require('../controllers/user.controller');
const { xss } = require('express-xss-sanitizer');
const schemaValidator = require('../middlewares/validator/api/schema.validator');
const {signupSchema}= require('../middlewares/validator/api/schema/signup.schema');
const {loginSchema} = require('../middlewares/validator/api/schema/login.schema');
const Authenticator = require('../middlewares/security/authenticator');

const router = express.Router();

/** guardentification Routes */
router.post('/signup', xss(), schemaValidator.body(signupSchema), userController.signup);
router.post('/login',xss(), schemaValidator.body(loginSchema), userController.login);
router.get('/refresh-token', Authenticator , userController.refreshToken);

module.exports = router;