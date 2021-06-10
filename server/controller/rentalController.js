const RentalItemModel = require('../model/rentalItems');
const BookingModel = require('../model/bookings');



exports.createRental = async (req, res) => {
    const reqRental = req.body;

    //get access to user stored in local for tokenAuthenticate fuction
    const user = res.locals.user;

    // create new booking object
    //const newRental = new RentalItemModel(reqRental);
    reqRental.owner = user;

    try {
        const newRental = await RentalItemModel.create(reqRental);
        //push new rental into the user document and update user - commented as of now as we intend to get rentals from rental collection only
        //(Do not use save as pre save function will trigger)
        //UserModel.updateOne({ _id: user.id }, { $push: { rentals: createdRental } }, function () { });
        return res.json(newRental);
    } catch (error) {
        return res.mongoError(error);
    }
}

exports.updateRental = async (req, res) => {
    //get data to be updated in rental from request body
    const reqRental = req.body;
    //get access to user stored in local for tokenAuthenticate fuction
    const user = res.locals.user;
    //get id of rental to update
    const rentalId = req.params.rentalId;

    try {
        //find the rental using the id and get user of the rental
        const foundRental = await RentalItemModel
            .findById(rentalId)
            .populate('owner', '_id')
        // Check if logged in user is same as rental's user i.e. rental owner
        if (!foundRental) {
            return res.sendApiError(
                {
                    title: 'Invalid Rental!',
                    detail: 'Rental requested not found'
                });
            };
        if (foundRental.owner.id !== user.id) {
            return res.sendApiError(
                    {
                        title: 'Invalid User!',
                        detail: 'You cannot update the rental as you are not the owner of this rental'
                    });
            };
        foundRental.set(reqRental);
        await foundRental.save();
        const updatedRental = await RentalItemModel
                                    .findById(rentalId)
                                    .populate('owner', '-password')
                                    .populate('image');
        return res.status(200).send(updatedRental);
    } catch (error) {
        return res.mongoError(error);
    }
}

exports.getMyRentals = async function (req, res) {
    const user = res.locals.user;
    
    try {
        const foundRentals = await RentalItemModel
            .find({ owner: user })
            .populate('image');
        return res.json(foundRentals);
    } catch(error) {
        return res.mongoError(error);
    }
}

exports.getRentalById = async (req, res) => {
    const rentalId = req.params.rentalId;
    try {
        foundRentalItem = await RentalItemModel
            .findById(rentalId)
            .populate('owner', 'username -_id')
            .populate('image');
        //Did not find the Rental with the requested rentalId
        if (foundRentalItem == null) {
            return res
                .sendApiError(
                    {
                        title: 'Invalid Rental!',
                        detail: 'Rental requested not found'
                    });
        }
        res.json(foundRentalItem);
    } catch(error) {
        return res.mongoError(error);
    }
}

exports.getRentals = async function (req, res) {
    const cityQueried = req.query.city;
    const cityQuery = cityQueried ? { 'city': { '$regex': cityQueried, '$options': 'i'} } : {};
    
    try {
        const filteredRentalItems = await RentalItemModel
            .find(cityQuery)
            .populate('image');
        if (cityQueried && filteredRentalItems.length === 0) {
            //Did not find the Rental with the requested city
            return res
                .sendApiError(
                    {
                        title: 'No Rentals Found',
                        detail: `No results found with your search: [${ cityQueried }]`
                    });
        }
        return res.json(filteredRentalItems);
    } catch (error) {
        return res.mongoError(error);
    }
}

exports.deleteRental = async (req, res) => {
    const user = res.locals.user;
    const rentalId = req.params.rentalId;

    try {
        const foundRental = await RentalItemModel
            .findById(rentalId)
            .populate('owner', '_id');
        // Check if the rentalItem was found. if not return error
        if (!foundRental) {
            return res
                .sendApiError(
                    {
                        title: 'Invalid Rental',
                        detail: "Rental requested not found'"
                    });
        }
        // Check if the logged-in user is owner of this rental
        // If not return error stating that you cannot delete rental that you dont own
        if (foundRental.owner.id !== user.id) {
            return res.sendApiError(
                    {
                        title: 'Invalid User',
                        detail: "You cannot delete this rental as you are not owner of the rental"
                    });
        }
        
        // Check if there are any bookings against this rental
        // If yes return error stating that the bookings exist and cannot be deleted however can be de-activated
        const bookings = await BookingModel.find({ rentalItem: foundRental });
        if (bookings && bookings.length > 0) {
            return res
                .sendApiError(
                    {
                        title: 'Bookings Exist',
                        detail: "You cannot delete this rental as there are bookings already on the rental. You may de-activate if required"
                    });
        }
        // Delete the rental
        await foundRental.remove();
        return res.json({ 'RentalId': rentalId })
    } catch (error) {
        return res.mongoError(error);
    }
}

// The method isUserRentalOwner is not used so far
exports.isUserRentalOwner = function (req, res, next) {
    const user = res.locals.user;
    const rentalItem = req.body.rentalItem;
    
    if (!rentalItem) {
        return res
            .sendApiError(
                {
                    title: 'Invalid Booking Request',
                    detail: "Rental on which to book is not provided"
                });
    }

    RentalItemModel
        .findById(rentalItem)
        .populate('owner')
        .exec((error, foundRental) => {
            if (error) { return res.mongoError(error); }

            if (foundRental) {
                if (foundRental.owner.id === user.id) {
                    return res
                        .sendApiError(
                            {
                                title: 'Invalid User',
                                detail: "You cannot create booking on your own rental"
                            });
                }
            } else {
                return res
                    .sendApiError(
                        {
                            title: 'Invalid Booking',
                            detail: "Choosen rental doesnt exist!"
                        });
            }
        next();
        })
}

exports.verifyUserIsOwner = async (req, res) => {
    const { user } = res.locals;
    const { rentalId } = req.params;

    try {
        const foundRental = await RentalItemModel.findById(rentalId).populate('owner');
        // Check if the rentalItem was found. if not return error
        if (!foundRental) {
            return res
                .sendApiError(
                    {
                        title: 'Invalid Rental',
                        detail: "Rental requested not found'"
                    });
        }
        // Check if the logged-in user is owner of this rental
        if (foundRental.owner.id !== user.id) {
            return res.sendApiError(
                {
                    title: 'Invalid User',
                    detail: 'You are not owner of this rental!'
                });
        }

        return res.json({ status: 'verified' });
    } catch (error) {
        return res.mongoError(error);
    }
}
exports.getSecret = function (req, res) {
    res.json({ "secret": true, "user": res.locals.user });
}