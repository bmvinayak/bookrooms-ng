const myExpress = require('express');
const rentalRouter = myExpress.Router();
const RentalItemModel = require('../model/rentalItems');
const UserCtrl = require('../controller/userController');
const user = require('../model/user');

rentalRouter.get('/secret', UserCtrl.tokenAuthenticate,function(req,res){
	res.json({"secret": true,"user": res.locals.user});
});

rentalRouter.get('', function(req, res){
	RentalItemModel.find({}, function(err, foundRentalItems) {
		res.json(foundRentalItems);
	});
});

rentalRouter.get('/:id', function(req, res){
	
	const rentalId = req.params.id;
	console.log(req.params);
	RentalItemModel.findById(rentalId, function(err, foundRentalItem) {
		if (err) {
			// Error in querying rentals
			res.status(422).send({errors: [{title: 'Rental Errors', detail: 'Error in finding Rental Item'}]});
		} else {
			//Did not find the Rental with the requested rentalId
			if (foundRentalItem == null) {
				res.json({message: [{title: 'Rental Data', detail: 'Rental Item not available'}]});	
			} else
			{
				res.json(foundRentalItem);
			}
		}
	});
});

module.exports = rentalRouter;