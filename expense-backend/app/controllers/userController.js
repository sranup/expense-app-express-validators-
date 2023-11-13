const User = require('../models/User')
const Budget = require('../models/Budget')
const UserProfile = require('../models/UserProfile')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult}=require('express-validator')

const userCtrl = {}

userCtrl.register = async (req, res) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    // const body = req.body
    // const userDetails = new User(body)
    // const budgetDetails = new Budget()
    // const profileDetails = new UserProfile()
    // userDetails.save()
    //     .then((user) => {
    //         budgetDetails.userId = user._id
    //         profileDetails.userId = user._id
    //         budgetDetails.save()
    //         profileDetails.save()
    //         res.json(user)
    //     })
    //     .catch((err) => {
    //         res.json(err)
    //     })
    const body=req.body
    try{
        const userDetails=new User(body)
        const budgetDetails = new Budget()
        const profileDetails = new UserProfile()
        const salt = await bcryptjs.genSalt() 
        const hashedPassword=await bcryptjs.hash(userDetails.password,salt)
        userDetails.password=hashedPassword
        budgetDetails.userId = userDetails._id
        profileDetails.userId = userDetails._id
        await budgetDetails.save()
        await profileDetails.save()
        await userDetails.save()
        res.json({
            message:'user registered successfully',
            userDetails
        })

    }catch(e){
        res.json(e)

    }
}

{/*userCtrl.login = (req, res) => {
    const body = req.body
    User.findOne({ email: body.email })
        .then((user) => {
            if (!user) {
                res.json({
                    error: 'Invalid email or password'
                })
            }

            bcryptjs.compare(body.password, user.password)
                .then((match) => {
                    if (match) {
                        const tokenData = {
                            id: user._id,
                            username: user.username,
                            email: user.email
                        }
                        const token = jwt.sign(tokenData, 'dct123', { expiresIn: '8d' })
                        res.json({
                            token: `Bearer ${token}`
                        })
                    } else {
                        res.json({
                            error: 'Invalid email or password'
                        })
                    }
                })
        })
}*/}

userCtrl.login=async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()})
    }

    const body=req.body
    try{
        const user=await User.findOne({email:body.email})
        if(!user){
            return res.status(404).json({error:'invalid email or password'})
        }

        const result=await bcryptjs.compare(body.password,user.password)
        if(!result){
            return res.status(404).json({error:'invalid email or password'})
        }
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = jwt.sign(tokenData, 'sr117', { expiresIn: '8d' })
        res.json({
            token: `Bearer ${token}`
        })
    }catch(e){
        res.status(500).json({
            error:'invalid email or password'
        })
    }
}

userCtrl.account = (req, res) => {
    res.json(req.user)
}

module.exports = userCtrl