const RentalItemModel = require('./model/rentalItems');
const UserModel = require('./model/user');
const BookingModel = require('./model/bookings');
const initialData = require('./data.json');

class GenerateDb{

	constructor() {
		this.rentalItems = initialData.rentals;
    this.users = initialData.users;
	}

	async cleanDb() {
    await BookingModel.deleteMany({});
    await RentalItemModel.deleteMany({});
    await UserModel.deleteMany({});
	}

	pushDataToDb() {
    const newUserDocument1 = new UserModel(this.users[0]);
    const newUserDocument2 = new UserModel(this.users[1]);

    this.rentalItems.forEach((rentalItem) => { 
      const newRentalItemDocument = new RentalItemModel(rentalItem);
      newRentalItemDocument.user = newUserDocument1;
      newRentalItemDocument.save();

      newUserDocument1.rentals.push(newRentalItemDocument);
    })
    newUserDocument1.save();		
    newUserDocument2.save();
	}


	async seedDb() {
		await this.cleanDb();
		this.pushDataToDb();
	}
}

module.exports = GenerateDb;
