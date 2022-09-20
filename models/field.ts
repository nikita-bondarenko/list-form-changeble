import { Schema, model } from 'mongoose'

const FieldSchema = new Schema(
    {
        type: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,

        },
        description: {
            type: String,
            required: false
        },
        required: {
            type: Boolean,
            default: false

        },
        default: {
            type: String,
            required: false

        },
        list: {
            type: Array,
            required: false
        }

    }
)

const Field = model('Field', FieldSchema)

export default Field