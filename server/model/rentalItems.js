const myMongoose = require('mongoose');
const schema = myMongoose.Schema;

const rentalItemSchema = new schema ({
	title: { type: String, required: true, maxlength: [128, ' Max 128 characters allowed']},
	city: { type: String, required: true, lowercase:true}, 
	street: { type: String, required: true, minlegth: [4, 'Min 4 characters required']},
	category: { type: String, required: true, lowercase:true}, 
	bedrooms: Number,
	shared: Boolean,
	description: {type: String, required: true },
	dailyRate: Number,
	currency: String,
	cancelBeforeDays: Number,
	createdAt: {type: Date, default: Date.now},
	image: {
		type: schema.Types.ObjectId,
		ref: 'CloudinaryImage'
	},
	owner: {
        type: schema.Types.ObjectId, 
        ref: 'User'
	}
});

rentalItemSchema.statics.sendError = function (res, config) {
	const { status, detail } = config;
	return res
		.status(status)
		.send({ errors: [{ title: 'Rental Error!', detail }] })
}

module.exports = myMongoose.model('RentalItem', rentalItemSchema);

