const { resolve } = require('path');

require('colors');

const mostrarMenu = () => {
    return new Promise( resolve => {
        console.clear();
        console.log('========================='.green);
        console.log('  Seleccione uns opción  '.green);
        console.log('=========================\n'.green);

        console.log(`${ '1.'.green } Crear tarea`);
        console.log(`${ '2.'.green } Listar tareas`);
        console.log(`${ '3.'.green } Listar tareas completadas`);
        console.log(`${ '4.'.green } Listar tareas pendientes`);
        console.log(`${ '5.'.green } Completar tarea(s)`);
        console.log(`${ '6.'.green } Borrar tarea`);
        console.log(`${ '0.'.green } Salir \n`);

        // Prepara la interfaz de usuario para crear y recibir informacion
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        // Mostrar informacion al usuario
        readline.question('Seleccione una opcion: ', (opt) => {
            readline.close();
            resolve(opt);
        } );
    });

}

const pausa = () => {
    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question(`\nPresione ${'ENTER'.green} para continuar\n`, (opt) => {
            readline.close();
            resolve();
        } );
    });
}

module.exports = {
    mostrarMenu,
    pausa
}

//---------------------------------------------------------
/*
const main = async() => {
    console.log('Hola Mundo!!!');

    let opt = '';
    do {
        opt = await mostrarMenu();

        if ( opt !== '0') await pausa();

    } while ( opt !== '0' );
}
*/