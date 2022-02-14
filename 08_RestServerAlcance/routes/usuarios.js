const { Router } = require('express');

const { validarCampos,
        validarJWT,
        esAdminRole,
        tieneRole } = require('../middlewares');

const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosDelete } = require('../controllers/usuarios');

const { createRulesUsuario,
        updateRulesUsuario,
        deleteRulesUsuario } = require('../controllers/request/rules-usuario');


const router = Router();

router.get('/', usuariosGet);

router.post('/',[
    createRulesUsuario(),
    validarCampos
], usuariosPost);

router.put('/:id', [
    updateRulesUsuario(),
    validarCampos
], usuariosPut);

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE','OTRO_ROLE'),
    deleteRulesUsuario(),
    validarCampos
], usuariosDelete);


module.exports = router;