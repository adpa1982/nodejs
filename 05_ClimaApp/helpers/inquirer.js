const inquirer = require('inquirer');
require('colors');


/**
 * Opciones del menu
 */
 const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: `${ '1.'.green } Buscar ciudad`
            },
            {
                value: 2,
                name: `${ '2.'.green } Historial`
            },
            {
                value: 0,
                name: `${ '0.'.green } Salir`
            },
        ]
    }
];

/**
 * Imprime el menu y captura la opcion seleccionada
 * @returns
 */
const inquirerMenu = async() => {

    console.clear();
    console.log('========================='.green);
    console.log('  Seleccione una opción  '.white);
    console.log('=========================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

/**
 * Se encarga de si desea continuar o detener la app
 */
const pausa = async() => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ];

    console.log('\n');

    await inquirer.prompt(question);
}

/**
 * Lee por pantalla la descripcion de la tarea
 * @param { mensaje } mensaje
 * @returns
 */
const leerInput = async( mensaje ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            mensaje,
            validate( value ) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}


const listarLugares = async( lugares = [] ) => {
    const choices = lugares.map( (lugar, i) => {
        const idx = `${ i + 1 }.`.green;
        return {
            value: lugar.id,
            name: `${ idx } ${lugar.nombre}`
        }
    } );

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar la eliminacion'
    });

    const question = [
        {
            type: 'list',
            name: 'id',
            message: `Borrar`,
            choices
        }
    ];

    const { id } = await inquirer.prompt(question);
    return id;
}

const confirmar = async( message ) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheckList = async( tareas = [] ) => {
    const choices = tareas.map( (tarea, i) => {
        const idx = `${ i + 1 }.`.green;
        return {
            value: tarea.id,
            name: `${ idx } ${tarea.desc}`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    } );

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ];

    const { ids } = await inquirer.prompt(question);
    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoCheckList
}