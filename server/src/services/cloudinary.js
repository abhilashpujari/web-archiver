const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

module.exports = class Cloudinary {
    constructor() {
        let {CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET} = process.env;
        cloudinary.config({
            cloud_name: CLOUDINARY_CLOUD_NAME,
            api_key: CLOUDINARY_API_KEY,
            api_secret: CLOUDINARY_API_SECRET
        });
    }

    async upload(filename) {
        let {CLOUDINARY_CLOUD_NAME} = process.env;
        try {
            let image = await cloudinary.uploader.upload(filename);
            let thumbnailImageUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_400,h_400,c_fill/${image.public_id}.${image.format}`;

            return {
                url: image.secure_url,
                height: image.height,
                width: image.width,
                size: image.bytes,
                thumbnail: thumbnailImageUrl
            }
        } catch (err) {
            if (err) {
                console.warn(err);
            }
        }

    }
}