const myExpress = require('express');
const myMongoose = require('mongoose').set('debug', true);
//const config = require('./config/dev');
const GenerateDb = require('./generateDb');
const RentalRouter = require('./routes/rentalRouter');
require('dotenv').config();

console.log(process.env);

myMongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true}).then (() => {
	const generateDb = new GenerateDb();
	generateDb.seedDb();
});

const app = myExpress();

const PORT = process.env.PORT || 3001;

app.use('/api/v1/rentals', RentalRouter);

app.listen(PORT, function() {
	console.log('I am listening');
});

