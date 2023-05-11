/* eslint-disable consistent-return */
const { validationResult } = require('express-validator');
const responseErrors = require('../helpers/response-errors');
const Register = require('../database/models/registers');

const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return responseErrors(res, 400, 'bad Request', errors);
    }
    next();
};

const checkUser = async (req, res, next) => {
    const { email } = req.body;

    const isUser = await Register.findOne({ email });
    if (isUser) {
        return responseErrors(res, 400, 'bad Request', {
            error: 'email',
            msg: `El correo ${email} ya existe`,
            // eslint-disable-next-line no-underscore-dangle
            id: isUser._id,
        });
    }
    next();
};

module.exports = {
    validateFields,
    checkUser,
};
