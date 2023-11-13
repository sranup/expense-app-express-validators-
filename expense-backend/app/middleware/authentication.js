const User = require('../models/User')
const jwt = require('jsonwebtoken')

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1]
    let tokenData
    try {
        tokenData = jwt.verify(token, 'sr117')
        console.log('tokenData', tokenData)
        User.findById(tokenData.id)
            .then((user) => {
                req.user = user
                console.log('user',req.user)
                next()
            })
            .catch((err) => {
                res.json(err)
            })

    } catch (e) {
        res.json(e.message)
    }
}

module.exports = { authenticateUser }