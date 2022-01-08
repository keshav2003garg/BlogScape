const errorHandler = (func) => {
    return (
        async (...arg) => {
            try {
                func(...arg)
            } catch (error) {
                if (!res.headersSent) {
                    res.status(500).json({
                        success: false,
                        message: error.message,
                    })
                }
            }
        }
    )
}

module.exports = errorHandler;