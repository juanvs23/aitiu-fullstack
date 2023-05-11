const responseSuccess = (res, status, data) =>
    res.status(status).json({
        status,
        data,
    });
module.exports = responseSuccess;
