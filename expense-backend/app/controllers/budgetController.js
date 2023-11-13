const Budget = require('../models/Budget')
const Category = require('../models/Categories')
const {validationResult}=require('express-validator')

const budgetCtrl = {}

budgetCtrl.update =  (req, res) => {
    const id = req.params.id
    console.log('id', id)
    const body = req.body
    console.log('body', body)
    Budget.findOneAndUpdate({ _id: id, userId: req.user._id }, body, { new: true })
        .then((budget) => {
            console.log('budget', budget)
            res.json(budget)
        })
        .catch((err) => {
            res.json(err)
        })
    // const errors=validationResult(req)
    // if(!errors.isEmpty()){
    //     return res.status(400).json({errors:errors.array()})   
    // }
    // const id=req.params.id
    // const body=req.body
    // console.log('id',id)
    // console.log('body',body)
    // try{
    //     const budget=await Budget.findOneAndUpdate({_id:id,userId:req.user._id},body,{new:true})
    //     res.json(budget)

    // }catch(e){
    //     res.status(500).json(e)

    // }

}

budgetCtrl.list = async (req, res) => {
    // Budget.findOne({ userId: req.user._id })
    //     .then((budget) => {
    //         res.json(budget)
    //     })
    //     .catch((err) => {
    //         res.json(err)
    //     })
    try{
        const budget=await Budget.findOne({ userId: req.user._id })
        res.json(budget)

    }catch(e){
        res.status(500).json(e)

    }
}


module.exports = budgetCtrl