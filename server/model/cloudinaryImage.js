const myMongoose = require('mongoose');
const schema = myMongoose.Schema;

const cloudinaryImageSchema = new schema({
    url: { type: String, required: true},
    cloudinaryId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = myMongoose.model('CloudinaryImage', cloudinaryImageSchema);

