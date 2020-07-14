const myExpress = require('express');
const bookingRouter = myExpress.Router();
const BookingCtrl = require('../controller/bookingController');
const UserCtrl = require('../controller/userController');


bookingRouter.post('', UserCtrl.tokenAuthenticate, BookingCtrl.createBooking);

module.exports = bookingRouter;