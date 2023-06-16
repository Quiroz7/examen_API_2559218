const { response } = require('express')

const Colegio = require('../models/colegio')

const getColegio = async (req, res = response ) => {
    let mensaje = ''
    try {
        const colegios = await Colegio.find()
        mensaje = colegios
    } catch (error) {
        mensaje = error
    }

    res.json({
        colegios : mensaje
    })
}

const postColegio = async (req, res = response ) => {
    const body = req.body
    let mensaje = ''
    const colegio = new Colegio(body)
    try {
        await colegio.save()
        mensaje = 'Se registró éxitosamente '
    } catch (error) {
        mensaje = error
    }

    res.json({
        mensaje
    })
}

const putColegio = async (req, res = response ) => {
    const body = req.body
    let mensaje = ''
    try {
        await Colegio.findOneAndUpdate({  _id:body._id} , { direccion:body.direccion, latitud:body.latitud, longitud:body.longitud, descripcion:body.descripcion})
        mensaje = 'Actualización éxitosa'
    } catch (error) {
        mensaje = 'Error en la actualización'
    }

    res.json({
        mensaje
    })
}

const deleteColegio = async(req, res = response) => {
    const body = req.body
    let mensaje = ''

    try {
        await Colegio.deleteOne({ _id:body._id})
        mensaje = 'Eliminación éxitosa'
    } catch (error) {
        mensaje = 'Error en la eliminacion'
    }

    res.json ({
        mensaje
    })
}

module.exports = {
    getColegio,
    postColegio,
    putColegio,
    deleteColegio
}