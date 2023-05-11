const { Schema, model } = require('mongoose');
/**
 * firstname:Juan Carlos
 * lastname:Avila Pérez
 * email:juanvs23@gmail.com
 * mobile:+584248310
 */
const RegisterSchema = new Schema({
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String, unique: true },
    mobile: { type: String },
    curp: { type: String },
    rfc: { type: String },
    birthdate: {
        type: String,
    },
    documentURL: { type: String },
    documentNumber: { type: String },
    expiredDocument: { type: String },
});
// eslint-disable-next-line func-names
RegisterSchema.methods.toJSON = function () {
    const { __v, _id, ...data } = this.toObject();
    data.id = _id;
    return data;
};

module.exports = model('Register', RegisterSchema);
