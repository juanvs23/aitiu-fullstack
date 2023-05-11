const JWT = require('jsonwebtoken');
/**
 *
 * @param {string} uid
 * @returns
 */
const setJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        const jwt = JWT.sign(
            payload,
            process.env.SECRETKEY,
            {
                expiresIn: '7d',
            },
            (error, token) => {
                if (error) {
                    reject(`No pudo generar el token: ${error}`);
                } else {
                    resolve(token);
                }
            }
        );
    });
};

module.exports = setJWT;
