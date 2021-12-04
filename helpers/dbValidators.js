const Role = require("../models/role")
const Usuario = require("../models/usuario");


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

module.exports ={
    rolValido,
    existeEmail,
    existeUsuarioxID     
}