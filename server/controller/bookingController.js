const BookingModel = require('../model/bookings');
const RentalItemModel = require('../model/rentalItems');
const moment = require('moment');
const BOOKING_DATE_FORMAT = 'YYYY/MM/DD';

exports.getReceivedBooking = async (req, res) => {
    const user = res.locals.user;
    try {
        const myRentalItems = await RentalItemModel.find({owner: user}, '_id');
        const myRentalItemIds = myRentalItems.map(r => r.id);
        const myreceivedBookings = await BookingModel
            .find({ rentalItem: {$in: myRentalItemIds} })
            .populate('user', '-password')
            .populate('rentalItem');
        return res.json(myreceivedBookings);
    } catch (error) {
        return res.mongoError(error);
    }
}

exports.getMyBookings = async function (req, res) {
    const user = res.locals.user;
    try {
        const foundBookings = await BookingModel
            .find({ user })
            .populate('user', '-password')
            .populate('rentalItem');
        return res.json(foundBookings);
    } catch (error) {
        return res.mongoError(error);
    }
};

exports.getBookings = async (req, res) => {
    const rentalItem = req.query.rentalItem;
    const query = rentalItem ? BookingModel.find({rentalItem}) : BookingModel.find({});

    try {
        const bookings = await query.select('startAt endAt -_id').exec();
        return res.json(bookings);
    } catch (error) {
        return res.mongoError(error);
    }
}

exports.createBooking = async function(req, res) {
    // NOTE: Whether the rental exists and if the user booking is not the owner 
    // is being checked in the middleware rentalController.isUserRentalOwner
    // Extract all details from the request body into bookingData object
    const bookingData = req.body;

    // create new booking object
    const newBooking = new BookingModel(
        {...bookingData, 
            startAt: moment.utc(bookingData.startAt, BOOKING_DATE_FORMAT).format(BOOKING_DATE_FORMAT),
            endAt: moment.utc(bookingData.endAt, BOOKING_DATE_FORMAT).format(BOOKING_DATE_FORMAT),
            cancelByDate: moment.utc(bookingData.cancelByDate, BOOKING_DATE_FORMAT).format(BOOKING_DATE_FORMAT)
        });
    // get the no of days to book
    const days = noOfDaysToBook(newBooking);
    if (days<1) {
        return res.sendApiError(
                {
                    title: 'Invalid Booking!',
                    detail: 'From and To date required and From date should be earlier than To date of booking!'
                });
    } else {
        newBooking.days = days;
    }
    try {
        // find all bookings of the rental being booked
        const rentalBookings = await BookingModel.find({ rentalItem: newBooking.rentalItem });
        // Check if booking dates are valid 
        if (isBookingDatesAvailable(newBooking, rentalBookings)) {
            // assign the user from tokenAuthenticate to the booking and store it
            newBooking.user = res.locals.user;
            const savedBooking = await newBooking.save();
            return res.json({ startAt: savedBooking.startAt, endAt: savedBooking.endAt });
        } else {
            return res.sendApiError(
                    {
                        title: 'Invalid Booking',
                        detail: 'Choosen dates on this rental is already booked!'
                    });
        }
    } catch(error) {
        return res.mongoError(error);
    }
}

exports.deleteBookings = async (req, res) => {
    const bookingId = req.params.bookingId;
    const user = res.locals.user;
    try {
        const foundBooking = await BookingModel.findById(bookingId).populate('user');
        if (foundBooking) {
            if (foundBooking.user.id !== user.id) {
                return res.sendApiError(
                    {
                        title: 'Invalid Delete Request',
                        detail: 'You are not the user who did this booking. Cannot Delete!'
                    });
            }
            if (moment(foundBooking.cancelByDate).diff(moment(), 'days') >= 0) {
                await foundBooking.remove();
                return res.json({ id: bookingId})
            } else {
                return res.sendApiError(
                    {
                        title: 'Invalid Delete Request',
                        detail: 'You are not allowed to delete after Cancel By date!'
                    });
            }
        } else {
            return res.sendApiError(
                {
                    title: 'Invalid Delete Request',
                    detail: 'Booking with requested Booking ID does not exist!'
                });
        }

    } catch (error) {
        return res.mongoError(error);
    }
}

function isBookingDatesAvailable(proposedBooking, rentalBookings) {
    let isAvailable = true;
    
    if (rentalBookings && rentalBookings.length>0){
        isAvailable = rentalBookings.every(function(booking){
            const proposedStartAt = moment(proposedBooking.startAt);
            const proposedEndAt = moment(proposedBooking.endAt);
            const bookedStartAt = moment(booking.startAt);
            const bookedEndAt = moment(booking.endAt);
            if ((bookedStartAt < proposedStartAt && bookedEndAt < proposedStartAt) 
                || (proposedEndAt < bookedEndAt && proposedEndAt < bookedStartAt)) {
                return true;
            } else {
                return false;
            }
        })
    } 
    return isAvailable;
}

function noOfDaysToBook(proposedBooking) {
    if (!proposedBooking.startAt || !proposedBooking.endAt) {
        return 0;
    }
    return moment(proposedBooking.endAt).diff(moment(proposedBooking.startAt), 'days')+1;
}