const express = require('express');
const hbs = require('hbs');
require('dotenv').config();


const app = express();
const port = process.env.PORT;

// Handlebars
// Usar un template
app.set( 'view engine', 'hbs' );
hbs.registerPartials( __dirname + '/views/partials');

// Servir contenido estatico
app.use( express.static('public') );

app.get('/', (req, res) => {
    res.render('home', {
        nombre: 'AD',
        titulo: 'Curso de NodeJS'
    });
});

app.get('/generic', (req, res) => {
    res.render('generic', {
        nombre: 'AD',
        titulo: 'Curso de NodeJS'
    });
});

app.get('/elements', (req, res) => {
    res.render('elements', {
        nombre: 'AD',
        titulo: 'Curso de NodeJS'
    });
});

app.get('*', (req, res) => {
    res.sendFile( __dirname + '/public/404.html' );
});

app.listen(port, () => {
    console.log(`Example app listening http://localhost:${port}`);
});