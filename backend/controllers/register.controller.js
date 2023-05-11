const Register = require('../database/models/registers');
const { addEmptyProperties, analyzeObject } = require('../helpers/utils');
const responseSuccess = require('../helpers/response-sucess');

/**
firstname,
lastname,
email,
mobile,
curp,
rfc,
birthdate,
documentURL,
documentNumber,
expiredDocument,
 */
/* eslint-disable class-methods-use-this */
class RegisterController {
    async getRegister(req, res) {
        const inputs = [
            'firstname',
            'lastname',
            'email',
            'mobile',
            'curp',
            'rfc',
            'birthdate',
            'documentURL',
            'documentNumber',
            'expiredDocument',
        ];
        const { email } = req.body;
        // eslint-disable-next-line new-cap
        const isUser = await Register.findOne({ email });
        if (!isUser) {
            responseSuccess(res, 200, {
                step: 1,
                data: null,
            });
        }
        if (isUser) {
            // eslint-disable-next-line no-underscore-dangle
            const response = Object.entries(isUser._doc)
                .filter(element => element[0] !== '__v')
                .map(([key, value]) => {
                    if (key === '_id') {
                        return ['id', value];
                    }
                    return [key, value];
                });
            // eslint-disable-next-line array-callback-return, consistent-return
            const fixObjet = addEmptyProperties(
                inputs,
                Object.fromEntries(response)
            );
            const getStatus = analyzeObject(inputs, fixObjet);
            console.log(getStatus);
            responseSuccess(res, 200, {
                step: getStatus,
                data: Object.fromEntries(response),
            });
        }
    }

    async addRegister(req, res) {
        const { firstname, lastname, email, mobile } = req.body;
        const isUser = await Register.findOne({ email });
        if (isUser) {
            responseSuccess(res, 200, {
                step: 0,
                data: 'New registration allowed',
            });
        } else {
            // eslint-disable-next-line new-cap
            const newProfile = new Register({
                firstname,
                lastname,
                email,
                mobile,
            });
            newProfile.save();
            responseSuccess(res, 200, { step: 0, data: newProfile });
        }
    }

    async addInformation(req, res) {
        const { id, curp, rfc, birthdate } = req.body;
        const information = await Register.findByIdAndUpdate(
            id,
            {
                curp,
                rfc,
                birthdate,
            },
            { new: true }
        );
        responseSuccess(res, 200, { step: 1, data: information });
    }

    async addDocument(req, res) {
        const { id, documentURL, documentNumber, expiredDocument } = req.body;
        const document = await Register.findByIdAndUpdate(
            id,
            {
                documentURL,
                documentNumber,
                expiredDocument,
            },
            { new: true }
        );
        responseSuccess(res, 200, { step: 2, data: document });
    }

    async getAllData(req, res) {
        const getRegs = req.body;
        const { email } = req.body;
        const isUser = await Register.findOne({ email });
        if (isUser) {
            responseSuccess(res, 200, {
                step: 1,
                data: 'New registration allowed',
            });
        } else {
            // eslint-disable-next-line new-cap
            const newProfile = new Register(getRegs);
            newProfile.save();
            responseSuccess(res, 200, { step: 4, data: newProfile });
        }
    }

    async saveRegister(req, res) {
        const getRegs = req.body;
        const { email } = req.body;
        const isUser = await Register.findOne({ email });
        if (isUser) {
            responseSuccess(res, 200, {
                step: 1,
                data: 'New registration allowed',
            });
        } else {
            // eslint-disable-next-line new-cap
            const newProfile = new Register(getRegs);
            newProfile.save();
            responseSuccess(res, 200, { step: 4, data: newProfile });
        }
    }
}
module.exports = { RegisterController };
