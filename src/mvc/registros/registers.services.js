const registersControllers = require('./registers.controllers')

const createRegister = (req, res) => {
    const { station, values } = req.body
    registersControllers.createRegister({ station, values })
        .then(data => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(404).json({ message: err.message })
        })
}

const getAllRegisters = (req, res) => {
    registersControllers.getAllRegisters()
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(404).json({ message: err.message })
        })
}
const getRegisters = (req, res) => {
    const station = req.params.station
    registersControllers.getAllRegisters(station)
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(404).json({ message: err.message })
        })
}

const getRegistersByDate = (req, res) => {
    const from = req.query.from
    const to = req.query.to
    const station = req.params.station
    registersControllers.getRegistersByDate(from, to, station)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

module.exports = {
    createRegister,
    getAllRegisters,
    getRegisters,
    getRegistersByDate
}