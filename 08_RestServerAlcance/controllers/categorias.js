const { response } = require('express');
const { Categoria } = require('../models');


const obtenerCategorias = async(req, res = response ) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { estado: true };

        const [ total, categorias ] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
                .populate('usuario', 'nombre')
                .skip( Number( desde ) )
                .limit(Number( limite ))
        ]);

        res.json({
            total,
            categorias
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error',
        });
    }
}

const obtenerCategoria = async(req, res = response ) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.
                                find( { id, estado: true } )
                                //findById( id )
                                .populate('usuario', 'nombre');

        res.json( categoria );

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error',
        });
    }
}

const crearCategoria = async(req, res = response ) => {
    try {
        const nombre = req.body.nombre.toUpperCase();
        const categoriaDB = await Categoria.findOne({ nombre });

        if ( categoriaDB ) {
            return res.status(400).json({
                msg: `La categoria ${ categoriaDB.nombre }, ya existe`
            });
        }

        // Generar la data a guardar
        const data = {
            nombre,
            usuario: req.usuario._id
        }

        const categoria = new Categoria( data );

        // Guardar DB
        await categoria.save();

        res.status(201).json(categoria);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error',
        });
    }
}

const actualizarCategoria = async( req, res = response ) => {
    try {
        const { id } = req.params;
        const { estado, usuario, ...data } = req.body;

        data.nombre  = data.nombre.toUpperCase();
        data.usuario = req.usuario._id;

        const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

        res.json( categoria );

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error',
        });
    }
}

const borrarCategoria = async(req, res =response ) => {
    try {
        const { id } = req.params;
        const categoriaBorrada = await Categoria.findByIdAndUpdate( id, { estado: false }, { new: true });

        res.json( categoriaBorrada );
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error',
        });
    }
}



module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}