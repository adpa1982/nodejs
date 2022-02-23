const { Router } = require('express');

const { validarJWT,
        validarCampos,
        esAdminRole } = require('../middlewares');

const { crearProducto,
        obtenerProductos,
        obtenerProducto,
        actualizarProducto,
        borrarProducto } = require('../controllers/productos');

 const { searchRulesProductoId,
         createRulesProducto,
         updateRulesProducto,
         deleteRulesProducto } = require('../controllers/request/rules-productos');

const router = Router();

//  Obtener todas las categorias - publico
router.get('/', obtenerProductos );

// Obtener una categoria por id - publico
router.get('/:id', [
    searchRulesProductoId(),
    validarCampos,
], obtenerProducto );

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    createRulesProducto(),
    validarCampos
], crearProducto );

// Actualizar - privado - cualquiera con token válido
router.put('/:id',[
    validarJWT,
    updateRulesProducto(),
    validarCampos
], actualizarProducto );

// Borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    deleteRulesProducto(),
    validarCampos,
], borrarProducto);


module.exports = router;