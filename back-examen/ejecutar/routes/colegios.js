const { Router } = require('express')

const coleRoute = Router()

const  { getColegio, postColegio, putColegio, deleteColegio} = require('../controllers/colegio')

coleRoute.get('/', getColegio)

coleRoute.post('/', postColegio)

coleRoute.put('/', putColegio)

coleRoute.delete('/', deleteColegio)

module.exports = coleRoute