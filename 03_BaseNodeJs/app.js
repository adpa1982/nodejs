const { crearArchivo } = require('./helpers/multiplicar');
const argv = require('./config/yargs');

require('colors');


// console.log(argv);
// console.log('base: yargs ', argv.base);


// Ejecucion: node app -b 9
// Ejecucion: node app -b 9 -l
// Ejecucion: node app -b 9 -l -h 11


crearArchivo(argv.b, argv.l, argv.h)
            .then(archivo => console.log('Archivo creado:', archivo.rainbow ))
            .catch(e => console.log(e));