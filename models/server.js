const express = require('express')
const cors = require('cors'); 
const { dbConnection } = require('../DB/config');




class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoute = '/api/usuarios';
        this.authPath = '/api/auth';

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
        
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosRoute, require('../routes/user'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto ', this.port);
        })
    }
}

module.exports = Server;