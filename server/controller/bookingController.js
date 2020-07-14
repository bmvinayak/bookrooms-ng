const BookingModel = require('../model/bookings');
const RentalItem = require('../model/rentalItems');
const User = require('../model/user');
const mongooseHelper = require('../helpers/mongooseHelper');
const moment = require('moment');

exports.createBooking = function(req, res) {
    // Extract booking details from the request body
    const startAt=req.body.startAt;
    const endAt=req.body.endAt;
    const dailyRate=req.body.dailyRate;
    const days=req.body.days;
    const noOfGuests =req.body.noOfGuests; 
    const rental = req.body.rental;
    //get access to user stored in local for tokenAuthenticate fuction
    const user = res.locals.user;

    // create new booking object
    const newBooking = new BookingModel({startAt, endAt, dailyRate, days,noOfGuests});

    // find the rental record and update it with booking and user details after validating and storing booking record
    RentalItem.findById(rental._id)
              .populate('bookings')
              .populate('user')
              .exec(function(err,foundRental){
        if (err){
            return res.status(422).send({errors: mongooseHelper.normalizeErrors(err.errors)});
        }
        if (foundRental) {
            // check if rental being booked is by the owner of the rental. If yes return error
            if (foundRental.user.id === user.id) {
                return res.status(422).send({errors: [{title: 'Invalid User', detail: 'Cannot book your own Rental !'}]});
            } 
            // Check for valid booking
            if (isValidBooking(newBooking, foundRental)) {
                //push rental and user into booking and save new booking
                newBooking.rentalItem = foundRental;
                newBooking.user = user;
                newBooking.save(function(err) {
                    if (err) {
                        return res.status(422).send({errors: mongooseHelper.normalizeErrors(err.errors)});
                    }
                    //push new booking and save rental
                    foundRental.bookings.push(newBooking);
                    foundRental.save();
                    //push new booking into user record and update user 
                    //(Do not use save as pre save function will trigger)
                    User.updateOne({_id: user.id}, {$push: {bookings: newBooking}}, function (){});
                    return res.json({StartAt: newBooking.startAt, EndAt: newBooking.endAt});
                });                      
            } else {
                return res.status(422).send({errors: [{title: 'Invalid Booking', detail: 'Choosen dates on this rental is already booked!'}]});
            }
        } else {
            console.log('Did not find rental');
            return res.status(422).send({errors: [{title: 'Invalid Booking', detail: 'Choosen rental doesnt exist!'}]});
        }
    })
}

function isValidBooking(proposedBooking, rental) {
    let isValid = true;
    
    if(rental.bookings && rental.bookings.length>0){
        isValid = rental.bookings.every(function(booking){
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
    return isValid;
}

