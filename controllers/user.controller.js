const { response, request } = require('express')

const usuariosGet = (req,res = response)=>{    
    

    const { hola, apikey} = req.query;
    res.json({
        msg: 'get API - Controller',
        hola,
        apikey
    });
}

const usuariosPost =  (req,res)=>{

    const {nombre, edad} = req.body;

    res.json({
        msg: 'post API - Controller'  ,
        nombre,
        edad
    });
}
const usuariosPut = (req,res)=>{

    const { id } = req.params;

    res.json({
        msg: 'put API - Controller',
        id
    })
}

const usuariosPatch = (req,res)=>{
res.json({
        "msg": 'patch API - Controller'
    })
}

const usuariosDelete = (req,res)=>{
    res.json({
        "msg": 'delete API - Controller'
    })
}
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
    
}