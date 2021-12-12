const express = require('express')
const cors = require('cors'); 
const { dbConnection } = require('../DB/config');




class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths ={
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            usuarios: '/api/usuarios',
            productos: '/api/productos',
        }
       

        //Conectarse a la DB
        this.conectarDB();


        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();

    }

    async conectarDB(){

        await dbConnection()
    }

    
    middlewares(){

        //CORS
        this.app.use(cors());

        //  Lectura y parse de body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));

    }

    routes(){
        
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.usuarios, require('../routes/user'));
        this.app.use(this.paths.productos, require('../routes/productos'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto ', this.port);
        })
    }
}

module.exports = Server;