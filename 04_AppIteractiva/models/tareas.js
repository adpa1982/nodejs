/**
 * _listado
 * { 'uuid-112233-445566-7: { id:12, desc:asdasd, completadoEN:20220203 } },
 * { 'uuid-112233-445566-7: { id:12, desc:asdasd, completadoEN:20220203 } },
 * { 'uuid-112233-445566-7: { id:12, desc:asdasd, completadoEN:20220203 } },
 */

const Tarea = require("./tarea");

 /*const tarea = new Tarea('Comprar comida');
 const tareas = new Tareas();
 tareas._listado[tarea.id] = tarea;

 console.log(tarea);
 console.log(tareas);*/

class Tareas {

    // Objeto
    _listado = {}

    //Metodo get:  Transformar un objecto a un array
    get listadoArr() {
        const listArray = [];
        // Recorre un obejto por su key
        Object.keys(this._listado).forEach( key => {
            // console.log(key);
            const tarea = this._listado[key];
            listArray.push(tarea);
        });
        return listArray;
    }

    constructor() {
        this._listado = {};
    }

    /**
     * Carga las tareas del archivo data.json
     * @param { tareas } tareas
     */
    cargarTareas( tareas = [] ) {
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    /**
     * Crea una tarea
     * @param { desc } desc
     */
    crearTarea( desc = '' ) {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listarTareas() {
        console.log();
        this.listadoArr.forEach( (tarea, i) => {
            const id = `${ i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn ) ? ' Completada'.green
                                            : 'Pendiente'.red;
            console.log(`${ id } ${ desc } :: ${estado}`);
        } );
    }

    listarTareasCompletadasPendientes( completadas = true ) {
        console.log();
        let contador = 0;
        this.listadoArr.forEach( (tarea, i) => {
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn ) ? ' Completada'.green
                                            : 'Pendiente'.red;
            if (completadas) {
                if (completadoEn) {
                    contador += 1;
                    console.log(`${ (contador + '.').green } ${ desc } :: ${completadoEn}`);
                }
            } else {
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${ (contador + '.').green } ${ desc } :: ${estado}`);
                }
            }

        } );
    }

    borrarTarea( id ) {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    toggleCompletadas( ids = [] ) {
        ids.forEach( id => {
            const tarea = this._listado[id];
            if ( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {
            if ( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
                //const tarea = this._listado[id];tarea.completadoEn = null;
            }
        } );
    }

}

module.exports = Tareas;