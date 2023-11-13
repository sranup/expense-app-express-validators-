const mongoose = require('mongoose')
const mongoose_delete = require('mongoose-delete')
const Schema = mongoose.Schema

const expenseSchema = new Schema({
    name:String,
    amount:Number,
    description:String,
    expenseDate:Date,
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:'Category'
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
}, { timestamps: true })

expenseSchema.plugin(mongoose_delete)

const Expense = mongoose.model('Expense', expenseSchema)
module.exports = Expense