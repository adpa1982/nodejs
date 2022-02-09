const { response } = require('express')

const usuariosGet = (req, res = response) => {
    const { q, nombre = 'No name', apikey } = req.query;
    res.json({
        msg: 'get API - Controller',
        q,
        nombre,
        apikey
    });
}

const usuariosPost = (req, res = response) => {
    const { nombre, edad } = req.body;
    res.json({
        msg: 'post API - Controller',
        nombre,
        edad
    });
}

const usuariosPut = (req, res = response) => {
    const { id } = req.params;
    res.json({
        msg: 'put API - Controller',
        id
    });
}

const usuariosDelete = (req, res = response) => {
    const { id } = req.params;
    res.json({
        msg: 'delete API - Controller',
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controller'
    });
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
};