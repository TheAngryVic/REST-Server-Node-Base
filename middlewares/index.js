const  validarJWT  = require("../middlewares/validar-jwt");
const  validarCampos  = require("../middlewares/validar-Campos");
const  validarRoles  = require("../middlewares/validar-roles");


module.exports ={

    ...validarJWT,
    ...validarRoles,
    ...validarCampos
}