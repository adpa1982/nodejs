const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');


const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {
        // Verificar si el email Existe
        const usuario = await Usuario.findOne({ correo});
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - correo',
            });
        }

        // Si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario en estado - false',
            });
        }

        // Verificar el password
        const validarPassword = bcryptjs.compareSync( password, usuario.password );
        if (!validarPassword) {
            return res.status(400).json({
                msg: 'Password - no es correcto',
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );


        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error',
        });
    }
}



module.exports = {
    login,
};