const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArchiveSchema = new mongoose.Schema({
    attachment: {
        type: Schema.Types.ObjectId,
        ref: "Attachment"
    },
    source: {
        name: {
            type: String,
        },
        title: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Archive', ArchiveSchema);