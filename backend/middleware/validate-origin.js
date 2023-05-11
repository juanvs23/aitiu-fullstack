const responseErrors = require('../helpers/response-errors');
const { hashCompare } = require('../helpers/bcrypt');

// eslint-disable-next-line consistent-return
const validateOrigin = (req, res, next) => {
    const { authorization } = req.headers;
    const validate = hashCompare(authorization);
    if (!validate) {
        return responseErrors(res, 401, 'Unauthorized', {
            error: 'unauthorized',
            msg: 'Unauthorized Access',
        });
    }
    next();
};

module.exports = { validateOrigin };
