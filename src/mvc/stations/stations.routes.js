const router = require('express').Router()
const stationsServices = require('./stations.services')

router.post('/', stationsServices.createStation)
router.get('/', stationsServices.getStations)
router.get('/:station', stationsServices.getStation)

module.exports = router