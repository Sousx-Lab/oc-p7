const express = require('express');
const { xss } = require('express-xss-sanitizer');
const  postController  = require('../controllers/post.controller');
const isGranted = require('../middlewares/security/authenticator');
const schemaValidator = require('../middlewares/validator/api/schema.validator');


const router = express.Router();

/** Posts Routes */
router.get('/', isGranted('ROLE_USER'), postController.getAllPosts);
router.get('/:id', isGranted('ROLE_USER'), postController.getOnePost)
router.post('/', xss(), isGranted('ROLE_USER'), postController.createPost)
router.put('/:id', xss(),isGranted('ROLE_USER'), postController.updatePost);
router.delete('/:id',isGranted('ROLE_USER'), postController.deletePost);
router.post('/:id/like',isGranted('ROLE_USER'), postController.likePost);

module.exports = router;