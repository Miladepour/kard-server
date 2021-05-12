const mongoose = require('mongoose')
const { Schema } = mongoose


const columnSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    board: {
        type: Schema.Types.ObjectId,
        ref: 'board',
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    cards: [{
      type: Schema.Types.ObjectId,
      ref: 'card'
    }]
},
{
    timestamps: true
})

module.exports = mongoose.model('column', columnSchema)