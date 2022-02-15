const express = require('express');
const { xss } = require('express-xss-sanitizer');
const  postController  = require('../controllers/post.controller');
const auth = require('../middlewares/security/auth');

const router = express.Router();
/** Posts Routes */
router.get('/', auth, postController.getAll);

module.exports = router;