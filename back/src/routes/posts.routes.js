const express = require('express');
const { xss } = require('express-xss-sanitizer');
const  postController  = require('../controllers/post.controller');
const isGranted = require('../middlewares/security/authenticator');
const schemaValidator = require('../middlewares/validator/api/schema.validator');
const {postSchema} = require('../middlewares/validator/api/schema/post.schema');
const multer = require('../middlewares/multer/multer');

const router = express.Router();

/** Posts Routes */

/**Get all Posts */
router.get('/', isGranted('ROLE_USER'), postController.getAllPosts);

/** Creat post */
router.post('/', xss(), isGranted('ROLE_USER'), multer, schemaValidator.body(postSchema), postController.createPost);

/** Get one Post by id */
router.get('/:id', isGranted('ROLE_USER'), postController.getPostById);

/**Update Post by id */
router.put('/:id', xss(),isGranted('ROLE_USER'), multer, schemaValidator.body(postSchema), postController.updatePost);

/** Delete Post by id */
router.delete('/:id',isGranted('ROLE_USER'), postController.deletePost);

/** Like unlike Post by id */
router.post('/like/:id',isGranted('ROLE_USER'), postController.likePost);

module.exports = router;