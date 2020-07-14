const myExpress = require('express');
const bodyparser = require('body-parser');
const myMongoose = require('mongoose');
//const config = require('./config/dev');
const GenerateDb = require('./generateDb');
const RentalRouter = require('./routes/rentalRouter');
const userRouter = require('./routes/userRouter');
const bookingRouter = require('./routes/bookingRouter');
const dotenv = require("dotenv");

dotenv.config();
myMongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).then (() => {
	const generateDb = new GenerateDb();
	//generateDb.seedDb();
});

const app = myExpress();

const PORT = process.env.PORT || 3001;

app.use(bodyparser.json());

app.use('/api/v1/rentals', RentalRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/bookings', bookingRouter);

app.listen(PORT, function() {
	console.log('I am listening');
});

