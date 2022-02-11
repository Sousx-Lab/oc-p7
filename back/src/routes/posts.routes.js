const express = require('express');
const { xss } = require('express-xss-sanitizer');
const auth = require('../middlewares/security/auth');

const router = express.Router();

/** Posts Routes */
router.get('/', xss(), auth, (req, res, next)=> {
    return res.status(200).json('ok');
} );

module.exports = router;