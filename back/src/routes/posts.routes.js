const express = require('express');
const { xss } = require('express-xss-sanitizer');
const  postController  = require('../controllers/post.controller');
const auth = require('../middlewares/security/auth');
const schemaValidator = require('../middlewares/validator/api/schema.validator');


const router = express.Router();

/** Posts Routes */
router.get('/', auth, postController.getAllPosts);
router.get('/:id', auth, postController.getOnePost)
router.post('/', xss(), auth, postController.createPost)

module.exports = router;