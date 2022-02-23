const dbValidators = require('./db-validators');
const generaJWT   = require('./generar-jwt');
const googleVerifi = require('./google-verify');
const subirArchivo = require('./subir-archivo');


module.exports = {
    ...dbValidators,
    ...generaJWT,
    ...googleVerifi,
    ...subirArchivo,
}