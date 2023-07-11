const { response } = require('express')
const config = require('../../config')
const registersControllers = require('./registers.controllers')
const io = require('socket.io-client')

const socket = io(config.socketurl)
console.log(config.socketurl)


const user = { name: 'Ricardo2', ci: 'ef614681-57cb-4964-984f-6f8efd68eded', mesa: '1', pedidos: [] }

// const { Server } = require('socket.io')
// const io = new Server({
//     cors: { origin: "*" }
// })
// io.listen(3500)

// let socket1

// io.on("connection", (socket) => {
//     console.log("someone conect: ", socket.id)
//     // io.emit("update", "new reg")
//     // response.json({ conectado: socket.id })
//     socket1 = socket
//     socket.on('join', room => {
//         console.log('join: ' + room)
//         socket.join(room)
//     })
//     // socket.emit('update', "new reg")
// })

const createRegister = async (req, res) => {
    const { station, values } = req.body
    console.log('create')
    await registersControllers.createRegister({ station, values })
        .then(data => {
            res.status(200).json(data)
            socket.emit('auth', user)
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
    registersControllers.getRegisters(station)
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

const getLast = (req, res) => {
    const station = req.params.station
    registersControllers.getLast(station)
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
    getRegistersByDate,
    getLast
}