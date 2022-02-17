const express = require('express');
const { xss } = require('express-xss-sanitizer');
const  postController  = require('../controllers/post.controller');
const Authenticator = require('../middlewares/security/authenticator');
const schemaValidator = require('../middlewares/validator/api/schema.validator');


const router = express.Router();

/** Posts Routes */
router.get('/', Authenticator, postController.getAllPosts);
router.get('/:id', Authenticator, postController.getOnePost)
router.post('/', xss(), Authenticator, postController.createPost)
router.put('/:id', xss(), Authenticator,  postController.updatePost);
router.delete('/:id', Authenticator, postController.deletePost);
router.post('/:id/like', Authenticator, postController.likePost);

module.exports = router;