const Archive = require('../models/Archive');
const utils = require('../utils/utils');

// @desc  Get all archive
// @route GET /api/v1/archive
// @access Public
exports.list = async (req, res, next) => {
    try {
        const query = req.query;
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limitPerPage = req.query.limitPerPage <= 100 ? parseInt(req.query.limitPerPage): 100;

        let criteria = {};

        const archives = await Archive
            .find(criteria)
            .skip((page - 1) * limitPerPage)
            .limit(limitPerPage)
            .populate('attachment')
            .sort({createdAt: -1});


        return res.status(200).json({
            data: archives,
            page,
            limitPerPage,
            query

        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// @desc  Get archive by id
// @route GET /api/v1/archive/:id
// @access Public
exports.view = async (req, res, next) => {
    try {

        const archive = await Archive
            .findById(req.params.id)
            .populate('attachment');

        if (!archive) {
            return res.status(404).json({
                code: 404,
                message: `Archive not found with id ${ req.params.id}`
            });
        }

        return res.status(200).json(archive);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};