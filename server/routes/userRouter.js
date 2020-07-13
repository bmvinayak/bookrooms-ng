const myExpress = require('express');
const userController = require('../controller/userController');
const userRouter = myExpress.Router();

userRouter.post('/login', userController.login);

userRouter.post('/register', userController.register);

module.exports = userRouter;