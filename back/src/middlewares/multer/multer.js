const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'src/media');
    },
    filename: (req, file, callback) => {
        const fileName = file.originalname.substr(0, file.originalname.lastIndexOf('.')).split(/[.\* +-;:?/]/).join("_")
            + Date.now().toString() + path.extname(file.originalname);
        callback(null, fileName);
    },
    
});

const filter = (req, file, callback) => {
    if(req.originalUrl === '/api/user/update'){
        if(!process.env.USER_PROFILE_PICTURE_TYPEMIME.split(", ").includes(file.mimetype)){
            req.fileValidationError = {
                error: true,
                fileExt: path.extname(file.originalname)
            }
            return callback(null ,false);
        }
    }
    if (!process.env.POST_COMMENT_TYPEMIME.split(", ").includes(file.mimetype)) {
        req.fileValidationError = {
            error: true,
            fileExt: path.extname(file.originalname)
        }
        return callback(null ,false);
    }
    callback(null, true);
};
module.exports = multer({storage : storage, fileFilter: filter}).single('media');