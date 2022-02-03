
const deadpool = {
    nombre: 'Wade',
    apellido: 'Winston Wilson',
    poder: 'Regeneracion',
    // edad: 50,
    getNombre: function () {
        return `${ this.nombre } ${ this.apellido } ${ this.poder }`;
    }
}

// console.log(deadpool.getNombre());

/*
const nombre = deadpool.nombre;
const apellido = deadpool.apellido;
const poder = deadpool.poder;
console.log(nombre, apellido, poder);
*/

/*
const { nombre, apellido, poder, edad = 0 } = deadpool;
console.log(nombre, apellido, poder, edad);
*/

// function imprimeHeroe(heroe) {
function imprimeHero({ nombre, apellido, poder, edad = 0 }) {
    nombre = 'AD';
    console.log(nombre, apellido, poder, edad);
}
// imprimeHeroe(deadpool);

const heroes = ['Deadpool', 'Superman', 'Batman'];
// const [h1, h2, h3] = heroes;
const [, , h3] = heroes;

// console.log(h1, h2, h3);
console.log(h3);