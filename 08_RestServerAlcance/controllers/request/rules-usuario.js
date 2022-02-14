const { check } = require('express-validator');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../../helpers/db-validators');

const createRulesUsuario = () => {
    return [
        check('nombre').not().isEmpty().withMessage('El nombre es obligatorio'),
        check('password').isLength({ min: 6 }).withMessage('El password debe de ser más de 6 letras'),
        check('correo').isEmail().withMessage('El correo no es válido'),
        check('correo').custom( emailExiste ),
        // Cuando se tiene un funcion o un callback, cuyo primer argumento, es el mismo argumento
        // que se recibe entonces se puede obviar esa parte, y se manda la referencia a la funcion
        //check('rol').custom( (rol) => esRoleValido(rol) ),
        check('rol').custom( esRoleValido ),
    ];
}

const updateRulesUsuario = () => {
    return [
        check('id').isMongoId().withMessage('No es un Id válido'),
        check('id').custom( existeUsuarioPorId ),
        check('rol').custom( esRoleValido ),
    ];
}

const deleteRulesUsuario = () => {
    return [
        check('id').isMongoId().withMessage('No es un Id válido'),
        check('id').custom( existeUsuarioPorId ),
    ];
}


module.exports = {
    createRulesUsuario,
    updateRulesUsuario,
    deleteRulesUsuario
}