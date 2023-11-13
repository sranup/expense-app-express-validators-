const Expense=require('../models/Expense')

const expenseValidationSchema={
    name:{
        notEmpty:{
            errorMessage:'type of expense is mandatory'
        }
    },
    amount:{
        notEmpty:{
            errorMessage:'mention amount'
        }
    },
    description:{
        notEmpty:{
            errorMessage:'valid description is necessary'
        }
    }
}

module.exports=expenseValidationSchema