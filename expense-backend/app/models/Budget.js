const mongoose = require('mongoose')
const Schema = mongoose.Schema
const budgetSchema = new Schema({
    amount: {
        type: Number,
        default: 0,
       required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Budget = mongoose.model('Budget', budgetSchema)
module.exports = Budget