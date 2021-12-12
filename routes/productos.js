const { Router, response } = require("express");
const { check } = require("express-validator"); //MIddleware de ExpressValidator
const { existeCategoriaxID, existeProductoxID, existeProducto } = require("../helpers/dbValidators");
const { validarCampos, validarJWT, adminRole } = require("../middlewares");
const {crearProducto,
     obtenerProductos, 
     obtenerProducto, 
     actualizarProducto,
     borrarProducto} = require('../controllers')

const router = Router();

/**
 *
 * {{url/api/productos}}
 */

//Obtener todos los productos
router.get('/',obtenerProductos)

//Obtener un producto x id
router.get('/:id',
[
    check("id", "El id ingresado no es un id de mongo"),
    check("id").custom(existeProductoxID),
    validarCampos
]
,obtenerProducto)

//Crear producto - privado - cualquira con token vaLIDO

router.post('/',
[
    validarJWT,
    check("nombre", "El campo nombre es obligatorio").not().isEmpty(),
    check("precio", "El campo precio debe ser un numero").isNumeric(),
    check("categoria","Id invalida").isMongoId(),
    check("categoria").custom(existeCategoriaxID),
    validarCampos
],
crearProducto);

//ACTUALIZAR - PRIVADO- CUALQUIERA CON TOKEN

router.put("/:id",[
    validarJWT,
    check("id", "El id ingresado no es un id de mongo").isMongoId(),
    check("id").custom(existeProductoxID),
    check("nombre").custom(existeProducto),
    check("categoria", "El id ingresado no es un id de mongo").isMongoId(),
    check("categoria").custom(existeCategoriaxID),
    validarCampos    
]
,actualizarProducto)

// BORRAR - PRIVADO - SOLO ADMIN - {estado: false}

router.delete("/:id",[
    validarJWT,
    adminRole,
    check("id", "El id ingresado no es un id de mongo").isMongoId(),
    check("id").custom(existeProductoxID),
    validarCampos    
]
,borrarProducto)



module.exports = router;
