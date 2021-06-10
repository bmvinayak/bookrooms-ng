const cloudinary = require('cloudinary').v2;
//const dotenv = require("dotenv");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

exports.cloudinaryUpload = file => {
    return cloudinary.uploader.upload(file);
    
}

exports.cloudinaryDestroy = public_id => {
    return cloudinary.uploader.destroy(public_id);
}

