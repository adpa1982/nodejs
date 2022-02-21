const { Router } = require('express');

const { createRulesLogin } = require('../controllers/request/rules-auth');
const { createRulesGoogle } = require('../controllers/request/rules-google');
const { validarCampos } = require('../middlewares/validar-campo');

const { login, googleSignin } = require('../controllers/auth');

const router = Router();


router.post('/login', [
    createRulesLogin() ,
    validarCampos
], login );

router.post('/google',[
    createRulesGoogle(),
    validarCampos
], googleSignin );


module.exports = router;