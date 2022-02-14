const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Path de las rutas
        this.usersPath = '/api/usuarios';
        this.authPath = '/api/auth';

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
    }

    routes() {

        // Auth
        this.app.use( this.authPath, require('../routes/auth') );

        // User
        this.app.use( this.usersPath, require('../routes/usuarios') );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server run en port: ', this.port);
        });
    }

}

module.exports = Server;