const config = require('../../config')
const registersControllers = require('./registers.controllers')


const { Server } = require('socket.io')
const http = require('http')

const express = require('express')
const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })


io.listen(config.socketport)

// io.on("connection", (socket) => {
//     console.log("somone new conection")

//     socket.on("disconnect", () => {
//         console.log("someone left")
//     })
// })



const createRegister = (req, res) => {
    const { station, values } = req.body
    console.log('create')
    registersControllers.createRegister({ station, values })
        .then(data => {
            io.emit("update", "new")
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