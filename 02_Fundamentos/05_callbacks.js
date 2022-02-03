/*
setTimeout(() => {
    console.log('Hola mundo')
}, 100);
*/

const getUsuarioById = ( id, callback ) => {
    const user = {
        id,
        nombre:'AD'
    }
    setTimeout(() => {
        callback(user)
    }, 1500);
}

getUsuarioById(10, ( usuario ) => {
    console.log(usuario);
});