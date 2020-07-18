const myExpress = require('express');
const rentalRouter = myExpress.Router();
const RentalItemModel = require('../model/rentalItems');
const UserCtrl = require('../controller/userController');
const user = require('../model/user');

rentalRouter.get('/secret', UserCtrl.tokenAuthenticate,function(req,res){
	res.json({"secret": true,"user": res.locals.user});
});

rentalRouter.get('', function(req, res){
	RentalItemModel.find({})
				   .select('-bookings')
				   .exec(function(err, foundRentalItems) {
		res.json(foundRentalItems);
	});
});

rentalRouter.get('/:id', UserCtrl.tokenAuthenticate, function(req, res){
	
	const rentalId = req.params.id;
	RentalItemModel.findById(rentalId)
				   .populate('user', 'username -_id')
				   .populate('bookings', 'startAt endAt -_id')
				   .exec(function(err, foundRentalItem) {
		if (err) {
			// Error in querying rentals
			res.status(422).send({errors: [{title: 'Rental Errors', detail: 'Error in finding Rental Item'}]});
		} else {
			//Did not find the Rental with the requested rentalId
			if (foundRentalItem == null) {
				res.status(410).send({ errors: [{title: 'Rental Not Found', detail: 'Rental Item not available'}]});	
			} else
			{
				debugger;
				res.json(foundRentalItem);
			}
		}
	})
});

module.exports = rentalRouter;