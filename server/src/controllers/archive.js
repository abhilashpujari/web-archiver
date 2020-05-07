const Archive = require('../models/Archive');

// @desc  Get all archive
// @route GET /api/v1/archive
// @access Public
exports.list = async (req, res, next) => {
    try {
        const archives = await Archive.find().populate('attachment');

        return res.status(200).json({
            success: true,
            count: archives.length,
            data: archives
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};