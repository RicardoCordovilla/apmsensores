const cors = require('cors')
const registersRouter=require('./mvc/registros/registers.routes')
const initModels = require('./mvc/initModels')

const db = require('./dabase')
const express = require('express')
const app = express()
app.use(express.json())
app.use(cors('*'))

db.authenticate()
    .then(() => { console.log('DB authenticated') })
    .catch(err => { console.log(err) })

db.sync()
    .then(() => { console.log('DB synced') })
    .catch(err => { console.log(err) })

initModels()

const { port } = require('./config')
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'OK',
        users: `localhost:${port}/api/v1`
    })
})

app.use('/api/v1/registers', registersRouter)

app.listen(port, () => {
    console.log(`server started at ${port}`)
})