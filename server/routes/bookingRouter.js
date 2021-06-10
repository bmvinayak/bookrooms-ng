const myExpress = require('express');
const bookingRouter = myExpress.Router();
const BookingCtrl = require('../controller/bookingController');
const { isUserRentalOwner } = require('../controller/rentalController')
const UserCtrl = require('../controller/userController');


bookingRouter.post('', UserCtrl.tokenAuthenticate, isUserRentalOwner, BookingCtrl.createBooking);

bookingRouter.get('/mybookings', UserCtrl.tokenAuthenticate, BookingCtrl.getMyBookings);
bookingRouter.get('/received', UserCtrl.tokenAuthenticate, BookingCtrl.getReceivedBooking);
bookingRouter.get('', BookingCtrl.getBookings);
bookingRouter.delete('/:bookingId', UserCtrl.tokenAuthenticate, BookingCtrl.deleteBookings);


module.exports = bookingRouter;