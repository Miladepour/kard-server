const mongoose = require('mongoose')
const { Schema } = mongoose

const cardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    column: {
        type: Schema.Types.ObjectId,
        ref: 'column',
        required: true
    },
    order: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('card', cardSchema)