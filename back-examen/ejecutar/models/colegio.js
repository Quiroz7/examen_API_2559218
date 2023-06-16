const { Schema, model } = require('mongoose')

const ColegioSchema = Schema ({
    direccion: {
        type: String,
        required: [true, 'La dirección es obligatoria']
    },

    latitud: {
        type: Number,
        required: [true, 'La latitud es obligatoria'],
        validate: {
            validator: (value) => {
                return value >= 6.14 && value <= 6.20; 
            },
            message: 'Latitud no cumple',
        },
    },

    longitud: {
        type: Number,
        required: [true, 'La longitud es obligatoria'],
        validate: {
            validator: (value) => {
                return value >= -75.43 && value <= 75.50; 
            },
            message: 'Longitud no cumple',
        },
    },

    fechaReporte: {
        type: Date,
        required: [true, 'La fecha es obligatoria'],
        default: Date.now
    },

    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    }

})

module.exports = model('Colegio', ColegioSchema)