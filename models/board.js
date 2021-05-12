const mongoose = require('mongoose')
const { Schema } = mongoose

const boardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    columns: [{
      type: Schema.Types.ObjectId,
      ref: 'column'
    }]
},
{
    timestamps: true
})

module.exports = mongoose.model('board', boardSchema)