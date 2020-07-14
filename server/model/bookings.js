const myMongoose = require('mongoose');
const schema = myMongoose.Schema;

const bookingsSchema = new schema ({
	startAt: { type: Date, required: [true, 'Start Date is required']},
	endAt: { type: Date, required: [true, 'End Date is required']},
	dailyRate: Number, 
    days: Number,
	noOfGuests:Number, 
	createdAt: {type: Date, default: Date.now},
	user: {
        type: schema.Types.ObjectId, 
        ref: 'User'
    },
    rentalItem: {
        type: schema.Types.ObjectId, 
        ref: 'RentalItem'
    }
});


module.exports = myMongoose.model('Booking', bookingsSchema);

