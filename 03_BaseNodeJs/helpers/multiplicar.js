const fs = require('fs');
const colors = require('colors');
const argv = require('yargs');


let crearArchivo = (base, listar = false, limite = 10) => {

    return new Promise((resolve, reject) => {

        if (!Number(base)) {
            reject(`El valor introducido ${ base } no es un número`);
            return;
        }

        let data = '';
        let consola = '';
        for (let i = 1; i <= limite; i++) {
            data += `${ base } X ${ i } = ${ base * i }\n`;
            consola += `${ base } ${'X'.green} ${ i } ${ '='.green } ${ base * i }\n`;
        }

        if ( listar ) {
            console.log('=================='.green);
            console.log('Tabla del'.green,  colors.blue( base ) );
            console.log('=================='.green);
            console.log(consola)
        }


        fs.writeFile(`./salida/tabla-${ base }-al-${ limite }.txt`, data, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve(`tabla-${ base }-al-${ limite }.txt`);
            }

        });

    });

}

module.exports = {
    crearArchivo
}