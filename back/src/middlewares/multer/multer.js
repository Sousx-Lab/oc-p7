const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, `src${process.env.MEDIA_FOLDER}`);
    },
    filename: (req, file, callback) => {
        const fileName = file.originalname.substr(0, file.originalname.lastIndexOf('.')).split(/[.\\* +-;:?/]/).join("") +
            Date.now().toString() + path.extname(file.originalname);
        callback(null, fileName);
    },

});

const filter = (req, file, callback) => {
    if (req.originalUrl === '/api/user/update') {
        if (!process.env.USER_PROFILE_PICTURE_TYPEMIME.split(", ").includes(file.mimetype)) {
            req.fileValidationError = {
                error: true,
                message: `File type ${path.extname(file.originalname)} not allowed. Allowed file types (${getExtFromMimeType(process.env.USER_PROFILE_PICTURE_TYPEMIME)})`
            }
            return callback(null, false);
        }
    }
    if (!process.env.POST_COMMENT_TYPEMIME.split(", ").includes(file.mimetype)) {
        req.fileValidationError = {
            error: true,
            message: `File type ${path.extname(file.originalname)} not allowed. Allowed file types (${getExtFromMimeType(process.env.POST_COMMENT_TYPEMIME)})`
        }
        return callback(null, false);
    }
    callback(null, true);
};

/**
 * 
 * @param {string} mime 
 * @returns {string}
 */
const getExtFromMimeType = (mime) => {
    const separator = ['image/', 'video/', 'audio/', 'text/', 'application/', ' ,'];
    const extentsions = mime.split(new RegExp(separator.join('|'), 'g'));
    return extentsions.join("").toString();
}

module.exports = multer({
    storage: storage,
    limits: '100mb',
    fileFilter: filter,
    }).fields([
        {
            name: 'media',
            maxCount: 1
        }, {
            name: 'profilePicture',
            maxCount: 1
        }])