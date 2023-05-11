const bcrypt = require('bcryptjs');

function hashCompare(text = 'secret') {
    const test = bcrypt.compareSync(process.env.SECRET_CODE, text);

    return test;
}
module.exports = {
    hashCompare,
};
