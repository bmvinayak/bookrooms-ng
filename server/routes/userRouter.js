const myExpress = require('express');
const userController = require('../controller/userController');
const userRouter = myExpress.Router();

userRouter.post('/loginAuthenticate', userController.loginAuthenticate);

userRouter.post('/register', userController.register);

module.exports = userRouter;