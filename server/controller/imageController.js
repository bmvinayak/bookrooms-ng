const myMulter = require('../services/multerService');
const singleUpload = myMulter.single('image');
const { transformToBase64 } = require('../services/dataUri');
const { cloudinaryUpload } = require('../services/cloudinary');
const { cloudinaryDestroy } = require('../services/cloudinary');
const RentalItemModel = require('../model/rentalItems');
const  CloudinaryImage = require('../model/cloudinaryImage');

exports.singleUploadCtrl = (req, res, next) => {
    singleUpload(req, res, (error) => {
        if (error) {
            return res.sendApiError({ 
                title: 'Upload Error',
                detail: error.message
            });
        }
        next();
    });
}

exports.uploadImage = async (req, res) => {

    try {
        if (!req.file) {
            throw new Error('Image is not available');
        }
        const fileInBase64 = transformToBase64(req.file);
        const result = await cloudinaryUpload(fileInBase64.content);
        const cImage = new CloudinaryImage({
            url: result.secure_url,
            cloudinaryId: result.public_id
        });
        const savedImage = await cImage.save();
        return res.json({_id: savedImage.id, url: savedImage.url});
    } catch(error) {
        return res.sendApiError({
            title: 'Upload Error',
            detail: error.message
        });
    }
    
}

exports.deleteImage = async (req, res) => {
    const imageId = req.params.imageId;
    try {
        const foundImage = await CloudinaryImage
            .findById(imageId)
        //Check if the image was found. if not return error
        if (!foundImage) {
            return res.sendApiError({
                title: 'Image Delete Error',
                detail: 'Image Record Not Found'
            });
        }
        // Check if any rental using the image
        const findRentalwithImageId = await RentalItemModel
            .find({ image: foundImage })
        if (findRentalwithImageId && findRentalwithImageId.length > 0) {
            return res.sendApiError({
                title: 'Image Delete Error',
                detail: 'Image Record being used. Cannot delete'
            })
        }

        // Destroy image from cloudinary
        await cloudinaryDestroy(foundImage.cloudinaryId);
        // Delete the image record
        await foundImage.remove();
        return res.json({ 'Deleted ImageId': imageId });
       

    } catch (error) {
        return res.sendApiError({
            title: 'Delete Image Error',
            detail: error.message
        });
    }
}
