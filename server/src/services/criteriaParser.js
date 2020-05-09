module.exports = class CriteriaParser {

    constructor(model, criteria) {
        this.model = model;
        this.criteria = criteria;
    }

    parse() {
        this.parseAnd();

        return this.model;
    }

    parseAnd() {
        if (this.criteria && typeof this.criteria['and'] !== "undefined" && this.criteria['and']) {
            this.criteria['and'].forEach((criteriaString) => {
                let parts = criteriaString.match('^([_A-Za-z.]+)\\s(lt|lte|gt|gte|equals|neq|like)\\s(.+)$');

                if (parts
                    && typeof parts[1] !== 'undefined'
                    && typeof parts[2] !== 'undefined'
                    && typeof parts[3] !== 'undefined') {
                    let key = parts[1];
                    let operation = parts[2];
                    let value = parts[3];

                    if (parts) {
                        this.model.where(key)[operation](value);
                    }
                }
            });
        }
    }

}