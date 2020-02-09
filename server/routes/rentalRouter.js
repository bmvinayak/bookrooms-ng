const myExpress = require('express');
const rentalRouter = myExpress.Router();
const RentalItemModel = require('../model/rentalItems');

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
			res.status(422).send({errors: [{title: 'Rental Errors', detail: 'Error in finding Rental Item'}]});
		} else {
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