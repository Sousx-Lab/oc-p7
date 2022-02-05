const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

/** Authentification Routes */
router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;