const { validationResult } = require("express-validator");
const { sendErrorResponse } = require("../common/genericsFunctions");

const checkValidations = (req, resp, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return sendErrorResponse({ response: resp, status: 400, error: result.formatWith() });
    }
    next();
};

module.exports = checkValidations;