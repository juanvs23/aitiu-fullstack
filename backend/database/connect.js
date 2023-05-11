/* eslint-disable operator-linebreak */
/* eslint-disable class-methods-use-this */
require('dotenv').config();
const mongoose = require('mongoose');

class CallDB {
    connectToDB() {
        const {
            MONGO_PROD_URL,
            MONGO_DEV_URL,
            MONGO_DATABASE,
            MONGO_USER,
            MONGO_PASS,
            MONGO_PORT,
            NODE_ENV,
        } = process.env;
        const MONGO_HOST =
            NODE_ENV === 'production' ? MONGO_PROD_URL : MONGO_DEV_URL;
        const url = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;

        mongoose
            .connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                user: MONGO_USER,
                pass: MONGO_PASS,
            })
            .then(() => {
                console.log('Conexion establecida');
            })
            .catch(er => {
                if (er.code === 18) {
                    mongoose.connect(
                        `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`
                    );
                    mongoose.connection.once('open', () => {
                        const user = MONGO_USER;
                        const password = MONGO_PASS;

                        // Crear un nuevo usuario y asignarlo a la base de datos "aitiu"
                        mongoose.connection.db
                            .addUser(
                                user,
                                password,
                                {
                                    roles: [{ role: 'readWrite', db: 'aitiu' }],
                                },
                                err => {
                                    if (err) {
                                        console.error(
                                            'Error al crear el usuario',
                                            err
                                        );
                                    } else {
                                        console.log(
                                            'Usuario creado exitosamente'
                                        );
                                    }

                                    // Cerrar la conexión después de crear el usuario
                                    mongoose.connection.close();
                                }
                            )
                            .then(() => {
                                console.log('Usuario creado exitosamente');
                                console.log('Conexion establecida');
                            });
                    });
                }
            });
    }

    async disconectToDB() {
        await mongoose.disconnect();
        console.log('Disconnected from the database');
    }
}

module.exports = CallDB;
