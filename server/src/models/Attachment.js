const mongoose = require('mongoose');

const AttachmentSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    imageData: {
        height: {
            type: Number,
            default: 0
        },
        size: {
            type: Number,
            default: 0
        },
        thumbnail: {
            type: String,
            default: null
        },
        width: {
            type: Number,
            default: 0
        }
    },
    mimeType: {
      type: String
    },
    name: {
        type: String
    },
    tag: {
        type: String
    },
    url: {
        type: String
    }
});


module.exports = mongoose.model('Attachment', AttachmentSchema);