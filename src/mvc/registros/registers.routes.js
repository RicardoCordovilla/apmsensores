const router = require('express').Router()
const registersServices = require('./registers.services')

router.post('/', registersServices.createRegister)

router.get('/', registersServices.getAllRegisters)
router.get('/:station', registersServices.getRegisters)
router.get('/:station/date', registersServices.getRegistersByDate)

module.exports = router