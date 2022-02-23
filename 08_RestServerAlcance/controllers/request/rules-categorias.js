const { check } = require('express-validator');

const { existeCategoriaPorId } = require('../../helpers');

const searchRulesCategoriaId = () => {
    return [
        check('id').isMongoId().withMessage('No es un Id válido'),
        check('id').custom( existeCategoriaPorId ),
    ];
}

const createRulesCategoria = () => {
    return [
        check('nombre').not().isEmpty().withMessage('El nombre es obligatorio'),
    ];
}

const updateRulesCategoria = () => {
    return [
        check('nombre').not().isEmpty().withMessage('El nombre es obligatorio'),
        check('id').custom( existeCategoriaPorId ),
    ];
}

const deleteRulesCategoria = () => {
    return [
        check('id').isMongoId().withMessage('No es un Id válido'),
        check('id').custom( existeCategoriaPorId ),
    ];
}


module.exports = {
    searchRulesCategoriaId,
    createRulesCategoria,
    updateRulesCategoria,
    deleteRulesCategoria
}