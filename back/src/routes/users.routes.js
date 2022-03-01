const express = require('express');
const userController = require('../controllers/user.controller');
const { xss } = require('express-xss-sanitizer');
const schemaValidator = require('../middlewares/validator/api/schema.validator');
const {signupSchema, loginSchema, updateUserSchema}= require('../middlewares/validator/api/schema/user.schema');
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
router.put('/update', xss(), isGranted('ROLE_USER'), multer, schemaValidator.body(updateUserSchema), userController.updateUser);

/** Get User by id */
router.get('/:id', isGranted('ROLE_USER'), userController.getUserByid);

/** Delete User by id */
router.delete('/delete', isGranted('ROLE_USER'), userController.deleteUser);

/** Refresh token */
router.post('/refresh-token', isGranted('ROLE_USER'), userController.refreshToken);

module.exports = router;