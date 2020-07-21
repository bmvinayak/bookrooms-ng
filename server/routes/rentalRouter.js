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

rentalRouter.get('/:id', UserCtrl.tokenAuthenticate, function (req, res) {
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
				return res.status(410).send({ errors: [{ title: 'No Rentals Found', detail: `There are no rentals in ${cityQuery}` }] });
			}
			return res.json(filteredRentalItems);
		});

});

module.exports = rentalRouter;