const myExpress = require('express');
const rentalRouter = myExpress.Router();
const RentalItemModel = require('../model/rentalItems');
const UserCtrl = require('../controller/userController');
const UserModel = require('../model/user');
const mongooseHelper = require('../helpers/mongooseHelper');

rentalRouter.post('', UserCtrl.tokenAuthenticate, function (req, res) {
	const { title, city, street, category, image, bedrooms,
		shared, description, dailyRate, currency } = req.body;

	//get access to user stored in local for tokenAuthenticate fuction
	const user = res.locals.user;

	// create new booking object
	const reqRental = new RentalItemModel({
		title, city, street, category, image, bedrooms,
		shared, description, dailyRate, currency
	});
	reqRental.user = user;

	RentalItemModel.create(reqRental, function (err, newRental) {
		if (err) {
			return res.status(422).send({ errors: mongooseHelper.normalizeErrors(err.errors) });
		}
		//push new rental into the user document and update user
		//(Do not use save as pre save function will trigger)
		UserModel.updateOne({ _id: user.id }, { $push: { rentals: newRental } }, function () { });
		return res.json(newRental);
	});

});

rentalRouter.get('/secret', UserCtrl.tokenAuthenticate,function(req,res){
	res.json({"secret": true,"user": res.locals.user});
});

rentalRouter.get('/myrentals', UserCtrl.tokenAuthenticate, function (req, res) {
	const user = res.locals.user;

	RentalItemModel
		.where({ user })
		.populate('bookings')
		.exec(function (err, foundRentals) {
			if (err) {
				return res.status(422).send({ errors: mongooseHelper.normalizeErrors(err.errors) });
			}
			return res.json(foundRentals);
		});
});

rentalRouter.get('/:id', function (req, res) {
	const rentalId = req.params.id;
	RentalItemModel.findById(rentalId)
		.populate('user', 'username -_id')
		.populate('bookings', 'startAt endAt -_id')
		.exec(function (err, foundRentalItem) {
			if (err) {
				// Error in querying rentals
				res.status(422).send({ errors: mongooseHelper.normalizeErrors(err.errors) });
			} else {
				//Did not find the Rental with the requested rentalId
				if (foundRentalItem == null) {
					res.status(410).send({ errors: [{ title: 'No Rentals Found', detail: 'Rental not available' }] });
				} else {
					debugger;
					res.json(foundRentalItem);
				}
			}
		})
});

rentalRouter.get('', function (req, res) {
	const cityQueried = req.query.city;
	const cityQuery = cityQueried ? { city: cityQueried.toLowerCase() } : {};

	RentalItemModel.find(cityQuery)
		.select('-bookings')
		.exec(function (err, filteredRentalItems) {
			if (err) {
				return res.status(422).send({ errors: mongooseHelper.normalizeErrors(err.errors) });
			}
			if (cityQueried && filteredRentalItems.length === 0) {
				//Did not find the Rental with the requested city
				return res.status(410).send({ errors: [{ title: 'No Rentals Found', detail: `There are no rentals in ${cityQueried}` }] });
			}
			return res.json(filteredRentalItems);
		});

});

rentalRouter.delete('/:id', UserCtrl.tokenAuthenticate,function(req, res) {
	const user = res.locals.user;

	RentalItemModel
		.findById(req.params.id)
		.populate('user', '_id')
		.exec(function(err,rentalItem) {
			if (err){
				return res.status(422).send({ errors: mongooseHelper.normalizeErrors(err.errors) });
			}
			// Check if the logged-in user is owner of this rental
			if (rentalItem.user.id !== user.id) {
				return res.status(410).send({ errors: [{ title: 'Invalid User', detail: 'You cannot delete as you are not owner of this rental' }] });
			}
			// Check if there are any bookings against this rental
			if (rentalItem.bookings.length>0) {
				return res.status(410).send({ errors: [{ title: 'Bookings Exist', detail: 'You cannot delete this rental as there are bookings already on the rental' }] });
			} 
			rentalItem.remove(function(err){
				if (err){
					return res.status(422).send({ errors: mongooseHelper.normalizeErrors(err.errors) });
				}
				return res.json({ "deleted": true})
			});
		});
});

module.exports = rentalRouter;