require('colors');

const { guardarDB, leerDB } = require('./db/guardarArchivo');
const { inquirerMenu,
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoCheckList
       } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


const main = async() => {

    const tareas = new Tareas();
    let opt = '';
    const tareasDB = leerDB();

    if ( tareasDB ) {
        tareas.cargarTareas(tareasDB);
    }

    do {
        // Imprime el menu
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // Creaar tarea
                const desc = await leerInput('Descripcion');
                console.log(desc);
                tareas.crearTarea( desc );
                break;
            case '2':
                // Mostrar listado de tareas
                tareas.listarTareas();
                break;
            case '3':
                // Mostrar listado de tareas completadas
                tareas.listarTareasCompletadasPendientes(true);
                break;
            case '4':
                // Mostrar listado de tareas pendientes
                tareas.listarTareasCompletadasPendientes(false);
                break;
            case '5':
                // Completar una tarea o varias tareas
                const ids = await mostrarListadoCheckList( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
                break;
            case '6':
                // Eliminar una tarea
                const id = await listadoTareasBorrar( tareas.listadoArr );
                // Preguntar si realmente quiere eliminar
                const ok = await confirmar('Esta seguro de borarlo?')
                if ( ok )  {
                    tareas.borrarTarea( id );
                    console.log('Tarea borrada corectamente');
                }
                break;
        }

        guardarDB( tareas.listadoArr );

        await pausa();

    } while ( opt !== '0' );
}

main();