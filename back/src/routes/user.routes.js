const express = require('express');
const userController = require('../controllers/user.controller');
const { xss } = require('express-xss-sanitizer');
const schemaValidator = require('../middlewares/validator/api/schema.validator');
const {signupSchema}= require('../middlewares/validator/api/schema/signup.schema');
const {loginSchema} = require('../middlewares/validator/api/schema/login.schema');
const isGranted = require('../middlewares/security/authenticator');

const router = express.Router();

/** User Routes */

/** Singup  */
router.post('/signup', xss(), schemaValidator.body(signupSchema), userController.signup);

/** Login */
router.post('/login',xss(), userController.login);

/** Logout */
router.get('/logout', userController.logout);

/** Refresh token */
router.get('/refresh-token', isGranted('ROLE_USER'), userController.refreshToken);

module.exports = router;