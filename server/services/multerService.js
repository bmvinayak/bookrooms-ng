const multerService = require('multer')

const ALLOWED_FILE_FORMATS = ['image/jpeg', 'image/gif', 'image/png', 'image/jpg']

const storage = multerService.memoryStorage();
const myMulter = multerService({
    storage,
    fileFilter: function(req, file, callback) {
        if (ALLOWED_FILE_FORMATS.includes(file.mimetype)) {
            callback(null, true)
        } else {
            callback(new Error('Invalid file format!'), false)
        }
    }
});

module.exports = myMulter;