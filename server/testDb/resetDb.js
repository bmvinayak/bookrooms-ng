const mongoose = require('mongoose');
const config = require('../config');
const GenerateDb = require('./generateDb');

mongoose.connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, async () => {
    const generateDb = new GenerateDb();
    console.log('Starting populating DB');
    await generateDb.seedDb();
    await mongoose.connection.close();
    console.log('DB has been populated!');
});