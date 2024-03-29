const express = require('express');
const userController = require('../controllers/user.controller');
const { xss } = require('express-xss-sanitizer');
const schemaValidator = require('../middlewares/validator/api/schema.validator');
const {signupSchema, loginSchema, 
    updateUserSchema, forgotPasswordSchema, resetPasswordSchema, deleteUserShema }= require('../middlewares/validator/api/schema/user.schema');
const multer = require('../middlewares/multer/multer')
const isGranted = require('../middlewares/security/authenticator');

const router = express.Router();

/** User Routes */

/** Singup  */
router.post('/signup', xss(), schemaValidator.body(signupSchema), userController.signup);

/** Login */
router.post('/login', xss(), schemaValidator.body(loginSchema), userController.login);

/** Logout */
router.get('/logout', userController.logout);

/** Update user  */
router.put('/:id', xss(), isGranted('ROLE_USER'), multer, schemaValidator.body(updateUserSchema), userController.updateUserById);

/** Get User by id */
router.get('/:id', isGranted('ROLE_USER'), userController.getUserById);

/** Delete User by id */
router.delete('/:id', isGranted('ROLE_USER'), schemaValidator.body(deleteUserShema), userController.deleteUserById);

/** Refresh token */
router.post('/refresh-token', isGranted('ROLE_USER'), userController.refreshToken);

/** Forgot password */
router.post('/password-forgot', schemaValidator.body(forgotPasswordSchema), userController.forgotPassword);

/** Reset passowrd */
router.post('/password-reset', schemaValidator.body(resetPasswordSchema), userController.resetPassowrd);

module.exports = router;