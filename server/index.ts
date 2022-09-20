
import express from "express"
import path from "path"
import config from '../config'
import cors from 'cors'
import mongoose from 'mongoose'
import  field from '../routes/field'
import  order from '../routes/order'


const port = config.port
const mongoUrl: any = config.mongoUrl

export const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(mongoUrl).then(() => console.log('MongoDB database connected...')).catch(err => console.error(err))

app.use('/field', field)
app.use('/order', order)

const frontDir = path.join("client", "dist")

app.use(express.static(frontDir))

app.listen(port, () => {
    console.log( `Listenning server on http://localhost:${port}`)
})

