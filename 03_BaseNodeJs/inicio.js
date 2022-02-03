const fs = require('fs');

//console.clear();
const base= 3;
console.log('==================');
console.log(`tabla de ${ base }`);
console.log('==================');

let salida ='';
for(let i = 1; i <= 10; i++){
    salida+= `${ base } X ${ i } = ${ base * i }\n`;
}
console.log(salida);

fs.writeFile(`tabla-${ base }.txt`, salida, (err) => {
    if (err)  throw err;
    console.log(`tabla-${ base }.txt`);
});

// Capturar por consola
console.log(process.argv);
const [ , , arg3 = 'base=5'] = process.argv;
const [ , base1 = 5] = arg3.split('=');
console.log(base1);

const crearArchivo = (base = 5) => {

    console.log('==================');
    console.log('Tabla del:', base  );
    console.log('==================');

    let salida ='';
    for(let i = 1; i <= 10; i++){
        salida+= `${ base } X ${ i } = ${ base * i }\n`;
    }

    console.log(salida);

    fs.writeFileSync(`tabla-${ base }.txt`, salida);

    console.log(`tabla-${ base }.txt creada`);
}

