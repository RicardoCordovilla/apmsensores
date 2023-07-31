// const registersServices = require('../mvc/registers/registers.services')

const { default: axios } = require('axios')
const express = require('express')
const app = express()
app.use(express.json())

const mqtt = require('mqtt')
const client = mqtt.connect('ws://broker.emqx.io:8083/mqtt')
let message = ""
let jsonMessage

const body = [
    { station: "ESP1", values: { H: 70 + Math.random().toFixed(3) * 10, T: 20 + Math.random().toFixed(3) * 10 }, createdAt: new Date() },
    { station: "ESP2", values: { H: 70 + Math.random().toFixed(3) * 10, T: 20 + Math.random().toFixed(3) * 10 }, createdAt: new Date() },
    { station: "ESP1", values: { H: 70 + Math.random().toFixed(3) * 10, T: 20 + Math.random().toFixed(3) * 10 }, createdAt: new Date() },
    { station: "ESP2", values: { H: 70 + Math.random().toFixed(3) * 10, T: 20 + Math.random().toFixed(3) * 10 }, createdAt: new Date() },
    { station: "ESP1", values: { H: 70 + Math.random().toFixed(3) * 10, T: 20 + Math.random().toFixed(3) * 10 }, createdAt: new Date() },
    { station: "ESP2", values: { H: 70 + Math.random().toFixed(3) * 10, T: 20 + Math.random().toFixed(3) * 10 }, createdAt: new Date() },
    { station: "ESP1", values: { H: 70 + Math.random().toFixed(3) * 10, T: 20 + Math.random().toFixed(3) * 10 }, createdAt: new Date() },
    { station: "ESP2", values: { H: 70 + Math.random().toFixed(3) * 10, T: 20 + Math.random().toFixed(3) * 10 }, createdAt: new Date() },
    { station: "ESP1", values: { H: 70 + Math.random().toFixed(3) * 10, T: 20 + Math.random().toFixed(3) * 10 }, createdAt: new Date() },
    { station: "ESP2", values: { H: 70 + Math.random().toFixed(3) * 10, T: 20 + Math.random().toFixed(3) * 10 }, createdAt: new Date() },
    { station: "ESP1", values: { H: 70 + Math.random().toFixed(3) * 10, T: 20 + Math.random().toFixed(3) * 10 }, createdAt: new Date() },
    { station: "ESP2", values: { H: 70 + Math.random().toFixed(3) * 10, T: 20 + Math.random().toFixed(3) * 10 }, createdAt: new Date() },
]

client.on('connect', function () {
    client.subscribe('esp32/test', function (err) {
        if (!err) {
            client.publish('esp32/test',
                JSON.stringify(body)
                // "82.2 | 23."
            )

        }

    })
    // client.end()

})

client.on('message', async function (topic, message) {
    // message is Buffer

    console.log("message recived: ", message.toString())
    message = message.toString()
    jsonMessage = JSON.parse(message)
    console.log(jsonMessage)

    jsonMessage.forEach(element => {
        console.log(element.station)
        const body = element
        axios.post('https://floricola-api-demo-production.up.railway.app/api/v1/registers',
            body
        )
            .then(response => console.log(response.data))
            .catch(err => console.log(err))
    });
    client.end()
})