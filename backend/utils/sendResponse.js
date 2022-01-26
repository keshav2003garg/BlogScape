const sendResponse = (res, statusCode, message, anotherResponse) => {
    if (message = "No message") {
        res.status(statusCode || 200).json({
            success: true,
            ...anotherResponse
        })
    }
    else {
        res.status(statusCode || 200).json({
            success: true,
            message: message,
            ...anotherResponse
        })
    }
}

module.exports = sendResponse;