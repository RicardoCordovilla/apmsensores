const stationsControllers = require('./stations.controllers')

const createStation = (req, res) => {
    const { title, alias } = req.body
    stationsControllers.createStation({ title, alias })
        .then(data => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(404).json({ message: err.message })
        })
}

const getStations = (req, res) => {
    stationsControllers.getStations()
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(404).json({ message: err.message })
        })
}

const getStation = (req, res) => {
    stationsControllers.getStation(req.params.station)
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(404).json({ message: err.message })
        })
}


module.exports = {
    createStation,
    getStations,
    getStation
}