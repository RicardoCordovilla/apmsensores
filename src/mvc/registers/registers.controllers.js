const { Op } = require("sequelize")
const Registers = require("./registers.model")
const Stations = require("../stations/stations.model")

const createRegister = async (data) => {
    const newRegister = await Registers.create({
        station: data.station,
        values: data.values
    })
    return newRegister
}

const getAllRegisters = async () => {
    const data = await Registers.findAll({
        include: [
            {
                model: Stations,
                as: "station"
            }
        ]
    })
    return data
}
const getRegisters = async (station) => {
    const data = await Registers.findAll({
        where: {
            station
        },
        include: [
            {
                model: Stations,
                as: "station"
            }
        ]
    })
    return data
}

const getRegistersByDate = async (startDate, endDate, station) => {
    const data = await Registers.findAll(
        {
            where: {
                station,
                createdAt: {
                    [Op.between]: [new Date(startDate), new Date(endDate)]
                }
            }
        }
    )
    return data
}

const getLast = async (station) => {
    const data = await Registers.findOne({
        limit: 1,
        where: {
            station,
            createdAt: { [Op.not]: null }
        },
        order: [['createdAt', 'DESC']]
    })
    return data
}

const deleteRegister = async (id) => {
    const data = await Registers.destroy({
        where: { id },
        force: true
    })
    return data
}

module.exports = {
    createRegister,
    getAllRegisters,
    getRegisters,
    getLast,
    getRegistersByDate,
    deleteRegister
}