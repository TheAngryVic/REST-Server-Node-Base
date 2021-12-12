const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { Usuario, Categoria, Producto } = require("../models");

const coleccionesPermitidas = ["categorias", "productos", "roles", "usuarios"];

const buscarUsuarios = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino); //TRUE

  if (esMongoID) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  //Exprecion regular
  const regex = new RegExp(termino, "i");

  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    results: usuarios,
  });
};

//buscar categorias

const buscarCategorias = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);

  if (esMongoID) {
    const categoria = await Categoria.findById(termino);

    return res.status(200).json({
      results: categoria ? [categoria] : [],
    });
  }

  //Exprecion regular
  const regex = new RegExp(termino, "i");

  const categorias = await Categoria.find({
    nombre: regex,
    estado:true,

  });

  res.json({
    results: categorias,
  });
};

//buscar productos
const buscarProductos = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);

  if (esMongoID) {
    const producto = await Producto.findById(termino)
                      .populate("categoria", "nombre");

    return res.status(200).json({
      results: producto ? [producto] : [],
    });
  }

  //Exprecion regular
  const regex = new RegExp(termino, "i");

  const productos = await Producto.find({ nombre: regex,estado: true })
                                  .populate("categoria", "nombre");   

  res.json({
    results: productos,
  });
};

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: ` Las colecciones permitidas son : ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "categorias":
      buscarCategorias(termino, res);
      break;
    case "productos":
        buscarProductos(termino,res)
      break;
    case "usuarios":
      buscarUsuarios(termino, res);
      break;

    default:
      res.status(500).json({
        msg: "Se le olvido hacer esta busqueda",
      });
  }
};

module.exports = {
  buscar,
};
