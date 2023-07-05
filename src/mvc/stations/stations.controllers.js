const { Op } = require('sequelize')
const Stations = require('./stations.model')

const createStation = async (data) => {
    const newRegister = await Stations.create({
        title: data.title,
    })
    return newRegister
}

const getStations = async () => {
    const data = await Stations.findAll({
        where: {
            enable: true,
        }
    })
    return data
}

module.exports = {
    createStation,
    getStations
}