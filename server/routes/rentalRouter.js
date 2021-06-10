const myExpress = require('express');
const rentalRouter = myExpress.Router();
const UserCtrl = require('../controller/userController');
const rentalCtrl = require('../controller/rentalController');

rentalRouter.post('', UserCtrl.tokenAuthenticate, rentalCtrl.createRental);

rentalRouter.patch('/:rentalId', UserCtrl.tokenAuthenticate, rentalCtrl.updateRental);

rentalRouter.get('/:rentalId/verify-user-is-owner', UserCtrl.tokenAuthenticate, rentalCtrl.verifyUserIsOwner);

rentalRouter.get('/myrentals', UserCtrl.tokenAuthenticate, rentalCtrl.getMyRentals);

rentalRouter.get('/:rentalId', rentalCtrl.getRentalById);

rentalRouter.get('', rentalCtrl.getRentals);

rentalRouter.delete('/:rentalId', UserCtrl.tokenAuthenticate, rentalCtrl.deleteRental);

rentalRouter.get('/secret', UserCtrl.tokenAuthenticate, rentalCtrl.getSecret);

module.exports = rentalRouter;