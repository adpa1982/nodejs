const { check } = require('express-validator');

const { existeProductoPorId,
        existeCategoriaPorId } = require('../../helpers');


const searchRulesProductoId = () => {
    return [
        check('id').isMongoId().withMessage('No es un Id válido'),
        check('id').custom( existeProductoPorId ),
    ];
}

const createRulesProducto = () => {
    return [
        check('nombre').not().isEmpty().withMessage('El nombre es obligatorio'),
        check('categoria').isMongoId().withMessage('No es un id de Mongo'),
        check('categoria').custom( existeCategoriaPorId ),
    ];
}

const updateRulesProducto = () => {
    return [
        check('id').custom( existeProductoPorId ),
        //check('categoria').isMongoId().withMessage('No es un id de Mongo'),
    ];
}

const deleteRulesProducto = () => {
    return [
        check('id').isMongoId().withMessage('No es un Id válido'),
        check('id').custom( existeProductoPorId ),
    ];
}


module.exports = {
    searchRulesProductoId,
    createRulesProducto,
    updateRulesProducto,
    deleteRulesProducto
}