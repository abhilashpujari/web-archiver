const Archive = require('../models/Archive');
const CriteriaParser = require('../services/criteriaParser');

// @desc  Get all archive
// @route GET /api/v1/archive
// @access Public
exports.list = async (req, res, next) => {
    try {
        const query = req.query;
        const page = query.page ? parseInt(query.page) : 1;
        const limitPerPage = query.limitPerPage <= 100 ? parseInt(query.limitPerPage): 100;

        let archives = Archive
            .find()
            .skip((page - 1) * limitPerPage)
            .limit(limitPerPage)
            .populate('attachment')
            .sort({createdAt: -1});

        let criteriaParser = new CriteriaParser(archives, query.criteria);
        criteriaParser.parse();

        let result = await archives.exec();

        return res.status(200).json({
            data: result,
            page,
            limitPerPage,
            query

        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
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