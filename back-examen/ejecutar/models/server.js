const express = require('express')

const cors = require('cors')

const bodyParser = require('body-parser')

const dbConection = require('../database/config')

class server{

    constructor() {
        this.app = express()

        this.PORT = process.env.PORT

        this.colegioPath = '/api/colegios'

        this.middlewares()

        this.routes()

        this.dbConectar()
    }

    middlewares() {
        this.app.use(express.static(__dirname + "/public"));

        this.app.use( cors() );

        this.app.use( bodyParser.json() )

    }

    routes() {
        
        this.app.use(this.colegioPath, require('../routes/colegios'))
    }

    async dbConectar(){
        await dbConection()
    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`Se está escuchando por el puerto ${this.PORT}`)
        })

    }
}

module.exports = server