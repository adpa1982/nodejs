const { check } = require('express-validator');

const createRulesGoogle = () => {
    return [
        check('id_token', 'El id_token es necesario').not().isEmpty()
    ];
}


module.exports = {
    createRulesGoogle,
}