const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usersPath = '/api/usuarios';

        // Middlewares
        this.middlewares();

        // Rutas de mi app
        this.routes();
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