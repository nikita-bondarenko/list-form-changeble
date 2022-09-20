import { Schema, model } from 'mongoose'

const OrderSchema = new Schema(
    {
        data: {
            type: Object,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }

    }
)

const Order = model('Order', OrderSchema)

export default Order