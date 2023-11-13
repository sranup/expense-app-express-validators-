const Expense = require('../models/Expense')
const Category = require('../models/Expense')
const {validationResult}=require('express-validator')

const expenseCtrl = {}

expenseCtrl.create = async(req, res) => {
    // const errors=validationResult(req)
    // if(!errors.isEmpty()){
    //     res.status(400).json({errors:errors.array()})
    // }
    const body=req.body
    const expenseDetails=new Expense(body)
    expenseDetails.userId=req.user._id
    try{
        await expenseDetails.save()
        await Category.find({userId:req.user._id})
        res.json(expenseDetails)
    }catch(e){
        res.status(500).json(e)
   }
}

expenseCtrl.list = async (req, res) => {
    try{
       const expense= await Expense.find({userId:req.user._id,deleted:false})
       res.json(expense)

    }catch(e){
        res.status(500).json(e)

    }
}

expenseCtrl.show = async (req, res) => {
    const id = req.params.id
    try{
        const expense=await Expense.findOne({_id:id,userId:req.user._id})
        res.json(expense)
    }catch(e){
        res.status(500).json(e)

    }
}

expenseCtrl.update = (req, res) => {
    const id = req.params.id
    console.log('expense id backend',id)
    const body = req.body
    console.log('expense body',body)
    Expense.findOneAndUpdate({ _id: id, userId: req.user._id }, body, { new: true })
        .then((expense) => {
            console.log('expense',expense)
            res.status(200).json(expense)
        })
        .catch((err) => {
            res.status(404).json(err)
        })
}

expenseCtrl.showDeleted = async (req, res) => {
    try{
        const expense=await Expense.find({userId:req.user._id,deleted:true})
        res.json(expense)

    }catch(e){
        res.status(500).json(e)
    }
}


expenseCtrl.softDelete = async(req, res) => {
    const id = req.params.id
    try{
        const expense= await Expense.delete({ _id: id, userId: req.user._id })
        res.json({
           "expense":expense,
            "id":id
        })
    }catch(e){
        res.status(500).json(e)
    }
   
       
        
}

expenseCtrl.restoreExpense =  (req, res) => {
    const id = req.params.id
    console.log('id', id)
    console.log('userId', req.user._id)
    Expense.findOne({ _id: id, userId: req.user._id, deleted: true })
        .then((expense) => {
            console.log('expense', expense)
            if (expense) {
                expense.restore()
                    .then((restored) => {
                        res.json(restored)
                        //console.log("restored", restored)
                    })
                    .catch((err) => {
                        res.json(err)
                    })
            } else {
                res.json('not found')
            }
        })
        .catch((err) => {
            res.json(err)
        })
    // const id=req.params.id
    // try{
    //     const expense=await Expense.findOne({_id:id,userId:req.user._id,deleted:true})
    //     if(expense){
    //        const restored= expense.restore()
    //        res.json(restored)
    //     }else{
    //         res.json('not found')
    //     }

    // }catch(e){
    //     res.status(500).json(e)

    // }
}

expenseCtrl.hardDelete = async(req, res) => {
    // const id = req.params.id
    // Expense.findOneAndDelete({ _id: id, userId: req.user._id })
    //     .then((expense) => {
    //         res.json(expense)
    //     })
    //     .catch((err) => {
    //         res.json(err)
    //     })
    const id=req.params.id
    try{
        const expense=await Expense.findOneAndDelete({_id:id,userId:req.user._id})
        res.json(expense)

    }catch(e){
        res.status(500).json(e)

    }
}

module.exports = expenseCtrl