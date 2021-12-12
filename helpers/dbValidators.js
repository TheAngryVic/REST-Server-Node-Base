const { Categoria, Usuario, Producto } = require("../models");
const Role = require("../models/role")


const rolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(` El rol  ${rol} no está registrado en la BD`);
  }
};

//Tarea correo

const existeEmail = async (correo = "")=>{

    const existencia = await Usuario.findOne({correo});
    if (existencia) {
        throw new Error('El correo ya está registrado')
    }
}


const existeUsuarioxID = async (id = "")=>{

    const existencia = await Usuario.findById(id);
    if (!existencia) {
        throw new Error(`El ID: ${id}, no existe`);
    }
}

/**
 *
 * Validaciones para categoria  
 * */

const existeCategoriaxID = async (id = "")=>{

    const existencia = await Categoria.findById(id);
    if (!existencia) {
        throw new Error(`El ID: ${id}, no existe`);
    }
}

const existeCategoria = async (nombre = "")=>{

    const existencia = await Categoria.findOne({nombre});
    if (existencia) {
        throw new Error(`${nombre} ya existe como categoria`);
    }
}

/**
 * Productos
 */

 const existeProductoxID = async (id = "")=>{

    const existencia = await Producto.findById(id);
    if (!existencia) {
        throw new Error(`El ID: ${id}, no existe`);
    }
}

const existeProducto = async (nombre = "")=>{

    const existencia = await Producto.findOne({nombre});
    if (existencia) {
        throw new Error(`${nombre} ya existe como Producto`);
    }
}


module.exports ={
    rolValido,
    existeEmail,
    existeUsuarioxID,
    existeCategoria,
    existeCategoriaxID,
    existeProductoxID,
    existeProducto
}