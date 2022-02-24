const fs = require('fs');
const path = require('path')
exports.deleteFile = (fileName) => {
    if (fileName) {
        if (fs.existsSync(path.join(__dirname, `../../media/`))){
            fs.unlink(path.join(__dirname, `../../media/${fileName}`), (err) => {
                if (err) {
                    return;
                }
            });
        }
    }
    return;
}