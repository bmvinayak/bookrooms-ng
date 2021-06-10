const myExpress = require('express');
const imageController = require('../controller/imageController');
const UserCtrl = require('../controller/userController');
const imageUploadRouter = myExpress.Router();

imageUploadRouter.post('', UserCtrl.tokenAuthenticate, imageController.singleUploadCtrl, imageController.uploadImage);

imageUploadRouter.delete('/:imageId', UserCtrl.tokenAuthenticate, imageController.deleteImage);


module.exports = imageUploadRouter;