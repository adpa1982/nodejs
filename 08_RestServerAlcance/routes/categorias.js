const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT,
        validarCampos,
        esAdminRole } = require('../middlewares');

const { crearCategoria,
        obtenerCategorias,
        obtenerCategoria,
        actualizarCategoria,
        borrarCategoria } = require('../controllers/categorias');

const { createRulesCategoria,
        deleteRulesCategoria,
        searchRulesCategoriaId,
        updateRulesCategoria } = require('../controllers/request/rules-categorias');

const router = Router();


//  Obtener todas las categorias - publico
router.get('/', obtenerCategorias );

// Obtener una categoria por id - publico
router.get('/:id',[
    searchRulesCategoriaId(),
    validarCampos,
], obtenerCategoria );

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    createRulesCategoria(),
    validarCampos
], crearCategoria );

// Actualizar - privado - cualquiera con token válido
router.put('/:id',[
    validarJWT,
    updateRulesCategoria(),
    validarCampos
], actualizarCategoria );

// Borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    deleteRulesCategoria(),
    validarCampos,
], borrarCategoria);



module.exports = router;