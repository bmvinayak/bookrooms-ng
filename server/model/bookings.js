const myMongoose = require('mongoose');
const schema = myMongoose.Schema;

const bookingsSchema = new schema ({
	startAt: { type: Date, required: [true, 'Start Date is required']},
	endAt: { type: Date, required: [true, 'End Date is required']},
    cancelByDate: { type: Date, required: [true, 'Cancel By Date is required'] },
    dailyRate: { type: Number, required: [true, 'Daily rate is required'] },
    days: { type: Number, required: [true, 'No of days is required'] },
    noOfGuests: { type: Number, required: [true, 'No of guests is required'] },
    totalAmount: { type: Number, required: true},
    currency: { type: String, required: [true, 'Currency is required']},
	createdAt: {type: Date, default: Date.now},
	user: {
        type: schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    rentalItem: {
        type: schema.Types.ObjectId, 
        ref: 'RentalItem', 
        required: true
    }
});


module.exports = myMongoose.model('Booking', bookingsSchema);

