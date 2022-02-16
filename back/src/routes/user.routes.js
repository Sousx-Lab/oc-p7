const express = require('express');
const userController = require('../controllers/user.controller');
const { xss } = require('express-xss-sanitizer');
const schemaValidator = require('../middlewares/validator/api/schema.validator');
const {signupSchema}= require('../middlewares/validator/api/schema/signup.schema');
const {loginSchema} = require('../middlewares/validator/api/schema/login.schema');
const auth = require('../middlewares/security/auth');

const router = express.Router();

/** Authentification Routes */
router.post('/signup', xss(), schemaValidator.body(signupSchema), userController.signup);
router.post('/login',xss(), schemaValidator.body(loginSchema), userController.login);
router.get('/refresh-token',auth , userController.refreshToken);

module.exports = router;