const STATUS_MESSAGES = require("./statusCodes");

const sendSuccessResponse = ({ response, status, message, data }) => {
    return response.status(status).json({
        data,
        message,
        status,
        isSuccess: true
    })
};

const sendErrorResponse = ({ response, status, error }) => {
    return response.status(status).json({
        error,
        message: STATUS_MESSAGES[status],
        statusCode: status,
        isSuccess: false
    })
};

module.exports = {
    sendSuccessResponse, sendErrorResponse
}