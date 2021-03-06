const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Path de las rutas
        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            users:      '/api/usuarios',
            uploads:    '/api/uploads',
        }

        // Conectar a la base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi app
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use( cors() );

        // Lectura y parseo del Body
        this.app.use( express.json() );

        // Directorio publico
        this.app.use( express.static('public') );

        // Fileupload - Carga de archivos
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {

        // Auth
        this.app.use( this.paths.auth, require('../routes/auth') );
        // Buscar
        this.app.use( this.paths.buscar, require('../routes/buscar') );
        // Categorias
        this.app.use( this.paths.categorias, require('../routes/categorias') );
        // Productos
        this.app.use( this.paths.productos, require('../routes/productos') );
        // User
        this.app.use( this.paths.users, require('../routes/usuarios') );
        // Uploads
        this.app.use( this.paths.uploads, require('../routes/uploads') );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server run en port: ', this.port);
        });
    }

}

module.exports = Server;