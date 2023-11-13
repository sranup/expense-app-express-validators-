const mongoose = require('mongoose')

const configDb = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/expense-app')
        .then(() => {
            console.log('connected to DB');
        })
        .catch(() => {
            console.log('not connected to DB');
        })
}

module.exports = configDb