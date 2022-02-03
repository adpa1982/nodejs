
const argv = require('yargs')
                .option('b', {
                    alias: 'base',
                    type: 'number',
                    demandOption: true,
                    describe: 'Es la base de la tabla de multiplicar'
                })
                .option('l', {
                    alias: 'listar',
                    type: 'boolean',
                    demandOption: true,
                    default: false
                })
                .option('h', {
                    alias: 'limite',
                    type: 'number',
                    demandOption: true,
                    default: 10,
                    describe: 'Es el limite de la tabla'
                })
                .check( (argv, options) => {
                    if (isNaN (argv.b) ) {
                        throw 'La base tiene que ser un número'
                    }
                    if (isNaN (argv.l) ) {
                        throw 'El limite tiene que ser un número'
                    }
                    return true;
                })
                .argv;

module.exports = argv;