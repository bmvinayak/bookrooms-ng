const myMongoose = require('mongoose').set('debug', true);
const schema = myMongoose.Schema;

const rentalItemSchema = new schema ({
	title: { type: String, required: true, max:[128, ' Max 128 characters allowed']},
	city: { type: String, required: true, lowercase:true}, 
	street: { type: String, required: true, min:[4, 'Min 4 characters required']},
	category: { type: String, required: true, lowercase:true}, 
	image: {type: String, required: true},
	bedrooms: Number,
	shared: Boolean,
	description: {type: String, required: true },
	dailyRate: Number,
	createdAt: {type: Date, default: Date.now}
});


module.exports = myMongoose.model('RentalItem', rentalItemSchema);
