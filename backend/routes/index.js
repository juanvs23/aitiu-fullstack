/* eslint-disable object-shorthand */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-arrow-callback */
const express = require('express');
const { check } = require('express-validator');

const { RegisterController } = require('../controllers/register.controller');
const { validateFields, checkUser } = require('../middleware/validate-fields');
const { uploadController } = require('../controllers/uploader.controller');
const responseErrors = require('../helpers/response-errors');
const { validateOrigin } = require('../middleware/validate-origin');

const router = express.Router();
const registerController = new RegisterController();

// Rutas
router.post(
    '/get-register',
    [
        validateOrigin,
        check('email', 'Correo obligatorio').not().isEmpty(),
        check('email', 'Formato de correo invalido').isEmail(),
        validateFields,
    ],
    registerController.getRegister
);
router.post(
    '/add-profile',
    [
        validateOrigin,
        check('firstname', 'Nombre obligatorio').not().isEmpty(),
        check('lastname', 'Apellido obligatorio').not().isEmpty(),
        check('email', 'Correo obligatorio').not().isEmpty(),
        check('mobile', 'Celular obligatorio').not().isEmpty(),
        check('email', 'Formato de correo invalido').isEmail(),
        check('mobile', 'Formato de celular invalido').isMobilePhone(),
        validateFields,
        checkUser,
    ],
    registerController.addRegister
);
router.put(
    '/add-information',
    [
        validateOrigin,
        check('id', 'Curp obligatorio').isMongoId(),
        check('curp', 'Curp obligatorio').not().isEmpty(),
        check('curp', 'Curp solo debe tener letras o numeros').isAlphanumeric(),
        check('curp', 'Curp Debe tener mas de  18 caracteres').isLength({
            min: 18,
        }),
        check('rfc', 'RFC obligatorio').not().isEmpty(),
        check('rfc', 'RFC solo debe tener letras o numeros').isAlphanumeric(),
        check('rfc', 'RFC Debe tener mas de  18 caracteres').isLength({
            min: 18,
        }),
        check('birthdate', 'Fecha de nacimiento obligatorio').not().isEmpty(),
        validateFields,
    ],
    registerController.addInformation
);
router.put('/add-document', registerController.addDocument);

// Old Upload

router.post('/upload', uploadController);

// old version of save-data

router.post(
    '/save-register',
    [
        validateOrigin,
        check('firstname', 'Nombre obligatorio').not().isEmpty(),
        check('lastname', 'Apellido obligatorio').not().isEmpty(),
        check('email', 'Correo obligatorio').not().isEmpty(),
        check('mobile', 'Celular obligatorio').not().isEmpty(),
        check('email', 'Formato de correo invalido').isEmail(),
        check('mobile', 'Formato de celular invalido').isMobilePhone(),
        check('curp', 'Curp obligatorio').not().isEmpty(),
        check('curp', 'Curp solo debe tener letras o numeros').isAlphanumeric(),
        check('curp', 'Curp Debe tener mas de  18 caracteres').isLength({
            min: 18,
        }),
        check('rfc', 'RFC obligatorio').not().isEmpty(),
        check('rfc', 'RFC solo debe tener letras o numeros').isAlphanumeric(),
        check('rfc', 'RFC Debe tener mas de  18 caracteres').isLength({
            min: 18,
        }),
        check('birthdate', 'Fecha de nacimiento obligatorio').not().isEmpty(),
        validateFields,
    ],
    registerController.getAllData
);

router.post('*', (req, res) => {
    responseErrors(res, 400, 'Bad request', 'Bad request');
});
router.get('*', (req, res) => {
    responseErrors(res, 404, 'Not found', 'Route not found');
});
module.exports = { router };
