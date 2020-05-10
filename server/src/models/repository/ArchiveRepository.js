const Archive = require('../Archive');
const CriteriaParser = require('../../services/criteriaParser');

module.exports = class ArchiveRepository {
    async getArchiveList(criteria, {page = 1, limitPerPage = 100}) {
        let archives = Archive
            .find()
            .skip((page - 1) * limitPerPage)
            .limit(limitPerPage)
            .populate('attachment')
            .sort({createdAt: -1});

        let criteriaParser = new CriteriaParser(archives, criteria);
        criteriaParser.parse();

        return await archives.exec();
    }
}