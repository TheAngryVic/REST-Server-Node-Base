const { Router, response } = require("express");
const { check } = require("express-validator"); //MIddleware de ExpressValidator
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categorias.controller");
const {
  existeCategoriaxID,
  existeCategoria,
} = require("../helpers/dbValidators");
const { validarJWT, validarCampos,tieneRole } = require("../middlewares");

const router = Router();

/**
 *
 * {{url/api/categorias}}
 */

//Obtener todas las categorias
router.get("/", obtenerCategorias);

//Obtener una categoria por id
router.get(
  "/:id",
  [
    check("id", "El id ingresado no es un id de mongo").isMongoId(),
    check("id").custom(existeCategoriaxID),
    validarCampos,
  ],
  obtenerCategoria
);

//Crear categoria - privado- cualquier persona con token valido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "EL nombre es obligatorio").not().isEmpty(),
    check("nombre").custom(existeCategoria),
    validarCampos,
  ],
  crearCategoria
);

//Actualizar- privado - cualquiera con token valido
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "El id ingresado no es un id de mongo").isMongoId(),
    check("id").custom(existeCategoriaxID),
    check("nombre").custom(existeCategoria),
    validarCampos,
  ],
  actualizarCategoria
);

// Borrar categoria- privado- solo admin -
router.delete(
  "/:id",
  [
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check("id", "El id ingresado no es un id de mongo").isMongoId(),
    check("id").custom(existeCategoriaxID),
    validarCampos,
  ],
  borrarCategoria
);

//

module.exports = router;
