const multer = require('multer');
const path = require('path');
const fs = require('fs');

const responseSuccess = require('../helpers/response-sucess');
const responseErrors = require('../helpers/response-errors');

const { DEV_URL, PORT } = process.env;
const limit = 3 * 1024 * 1024;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file);
        const basePath = path.resolve(__dirname, '../uploads');
        const month = new Date().getMonth() + 1;
        const folderMonth = `${month > 9 ? month : `0${month}`}`;
        const folderName = `${basePath}/${folderMonth}`;
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }
        cb(null, `${folderName}/`);
    },
    filename: (req, file, cb) => {
        const date = Date.now();
        cb(null, `${date}${path.extname(file.originalname)}`);
    },
});

// Validación del tipo de archivo con Multer
const fileFilter = (req, file, cb) => {
    // console.log(file);
    if (file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
// Configuración del límite de tamaño de archivo con Multer
const limits = {
    fileSize: limit, // 2MB
};

// Middleware de Multer
const upload = multer({
    storage,
    fileFilter,
    limits,
});

const uploadController = (req, res) => {
    upload.single('document')(req, res, err => {
        if (err instanceof multer.MulterError) {
            responseErrors(res, 400, err.code, 'Excedio el tamaño correcto');
        } else if (err) {
            // Un error desconocido ocurrió durante la subida.
            responseErrors(res, 500, 'fail', 'Error al subir el archivo');
        }
        const month = new Date().getMonth() + 1;
        const folderMonth = `${month > 9 ? month : `0${month}`}`;
        if (!req.file.filename) {
            responseErrors(
                res,
                400,
                'not upload',
                'No se subio ningun archivo'
            );
        }
        responseSuccess(res, 200, {
            message: 'upload completed',
            url: `${DEV_URL}:${PORT}/uploads/${folderMonth}/${req.file.filename}`,
        });
    });
};

module.exports = {
    uploadController,
    upload,
};
