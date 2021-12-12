const categorias = require('./categorias.controller');
const auth = require('./auth.controller');
const user = require('./user.controller');
const productos = require('./productos.controller');


module.exports = {
    ...auth,
    ...categorias,
    ...productos,
    ...user
}