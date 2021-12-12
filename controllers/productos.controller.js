const { response } = require("express");
const res = require("express/lib/response");
const { Producto } = require("../models");

//obtener todos los productos - paginado - total - populate
const obtenerProductos = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  const [total, productos] = await Promise.all([
    Producto.countDocuments({ estado: true }),
    Producto.find({ estado: true })
      .populate("usuario", "nombre")
      .populate("categoria", "nombre")
      .limit(Number(limite))
      .skip(Number(desde)),
  ]);

  res.json({
    total,
    productos,
  });
};

//obtener un producto x id
const obtenerProducto = async (req, res = response) => {
  const { id } = req.params;

  const producto = await Producto.findById(id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  res.json({ producto });
};

//Crear producto
const crearProducto = async (req, res = response) => {
  let { nombre, ...resto } = req.body;

  nombre = nombre.toUpperCase();

  const productoDB = await Producto.findOne({ nombre });

  if (productoDB) {
    return res.status(400).json({
      msg: `El producto ${nombre} ya existe en la base de datos`,
    });
  }

  //Generar data

  const data = {
    nombre,
    usuario: req.usuarioAutenticado._id,
    precio: resto.precio,
    categoria: resto.categoria,
  };

  const producto = new Producto(data);

  //Guardar en DB

  await producto.save();

  res.status(201).json({
    msg: `Producto: ${producto.nombre} ha sido registrado con exito`,
  });
};

//actualizar
const actualizarProducto = async (req , res = response)=>{

  const {id} = req.params;

  const {estado, usuario, ...data} = req.body;
  
  if(data.nombre){

    data.nombre = data.nombre.toUpperCase();
  }

  data.usuario = req.usuarioAutenticado._id;

  const producto = await Producto.findByIdAndUpdate(id, data, {new:true})
  .populate("usuario", "nombre")
  .populate("categoria", "nombre");

  res.status(200).json({
    producto,
    msg:"Producto actualizado"
  })

}

//borrar producto

const borrarProducto = async (req , res = response)=>{

  const {id} = req.params;

  const {estado, usuario, ...data} = req.body;  

  data.usuario = req.usuarioAutenticado._id;
  data.estado = false;

  const producto = await Producto.findByIdAndUpdate(id, data, {new:true})
  .populate("usuario", "nombre")
  .populate("categoria", "nombre");

  res.status(200).json({
    producto,
    msg:`Producto ${producto.nombre} eliminado`
  })

}

module.exports = {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  borrarProducto
};
