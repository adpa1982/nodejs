const { check } = require('express-validator');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../../helpers/db-validators');

const createRulesLogin = () => {
    return [
        check('correo').isEmail().withMessage('El correo es obligatorio'),
        //check('correo').custom( emailExiste ),
        check('password').not().isEmpty().withMessage('El password es obligatorio'),
    ];
}




module.exports = {
    createRulesLogin,
}