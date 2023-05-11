const responseErrors = (res, status, error, msg) =>
    res.status(status).json({
        status,
        data: {
            error,
            msg,
        },
    });
module.exports = responseErrors;
