const express = require('express');
const { xss } = require('express-xss-sanitizer');
const isGranted = require('../middlewares/security/authenticator');
const commentController = require('../controllers/comment.controller');
const schemaValidator = require('../middlewares/validator/api/schema.validator');
const multer = require('../middlewares/multer/multer');

const router = express.Router();

/** Get comment by id */
router.get('/:id', isGranted('ROLE_USER'), commentController.getCommentByid);

/** Create new comment by post id */
router.post('/:id', xss(), isGranted('ROLE_USER'), multer, commentController.createComment);

/** Update comment by id */
router.put('/:id', xss(),isGranted('ROLE_USER'), multer, commentController.updateComment);

/** Delete comment by id */
router.delete('/:id',isGranted('ROLE_USER'), commentController.deleteComment);

module.exports = router;