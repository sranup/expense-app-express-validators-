const Budget=require('../models/Budget')

const budgetValidationSchema={
    amount:{
        notEmpty:{
            errorMessage:'amount is required'
        }
    }

}

module.exports=budgetValidationSchema