const { Router } = require('express');


const { login } = require('../controllers/auth');
const { createRulesLogin } = require('../controllers/request/rules-auth');
const { validarCampos } = require('../middlewares/validar-campo');

const router = Router();


router.post('/login', [
    createRulesLogin() ,
    validarCampos
], login );



module.exports = router;