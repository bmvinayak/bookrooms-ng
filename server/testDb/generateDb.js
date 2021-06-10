const { rentals, users, images } = require('./data');
const RentalItemModel = require('../model/rentalItems');
const UserModel = require('../model/user');
const BookingModel = require('../model/bookings');
const CloudinaryImage = require('../model/cloudinaryImage');
//const initialData = require('./data.json');

class GenerateDb{

	async cleanDb() {
	await CloudinaryImage.deleteMany({});
    await BookingModel.deleteMany({});
    await RentalItemModel.deleteMany({});
    await UserModel.deleteMany({});
	}

	async pushDataToDb() {
	await CloudinaryImage.create(images);
    await RentalItemModel.create(rentals);
    await UserModel.create(users);
	}


	async seedDb() {
		await this.cleanDb();
		await this.pushDataToDb();
	}
}

module.exports = GenerateDb;

console.log('Do not run generateDB directly. Please run restDB.js to reset the database');