const { response } = require('express');
const bcryptjs = require('bcryptjs');

const { Usuario } = require('../models');

const { generarJWT,
        googleVerify } = require('../helpers/generar-jwt');


const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {
        // Verificar si el email Existe
        const usuario = await Usuario.findOne({ correo });
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

const googleSignin = async (req, res = response) => {

    const { id_token } = req.body;
    console.log('id_token : ', id_token);

    try {
        const { correo, nombre, img } = await googleVerify( id_token );
        let usuario = await Usuario.findOne({ correo });

        if ( !usuario ) {
            // Crear usuario
            const data = {
                nombre,
                correo,
                password: '123456',
                img,
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        // Si el usuario esta en DB
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
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
        res.status(400).json({
            msg: 'Token de Google no es válido'
        });
    }
}



module.exports = {
    login,
    googleSignin
};