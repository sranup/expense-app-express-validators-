const express = require('express')
const multer = require('multer')
const upload = multer({ dest: "./upload" })
const {checkSchema}=require('express-validator')
const { authenticateUser } = require('../app/middleware/authentication')
const userCtrl = require('../app/controllers/userController')
const budgetCtrl = require('../app/controllers/budgetController')
const categoryCtrl = require('../app/controllers/categoryController')
const expenseCtrl = require('../app/controllers/expenseController')
const profileController = require('../app/controllers/profileController')
const { userRegisterValidationSchema, userLoginValidationSchema } = require('../app/helpers/user-validation')
const budgetValidationSchema = require('../app/helpers/budget-validation')
const categoryValidationSchema = require('../app/helpers/category-validation')
const expenseValidationSchema = require('../app/helpers/expense-validation')
const router = express.Router()

//User
router.post('/users/register',checkSchema(userRegisterValidationSchema), userCtrl.register)
router.post('/users/login',checkSchema(userLoginValidationSchema), userCtrl.login)
router.get('/users/account', authenticateUser, userCtrl.account)

//Budget
router.put('/user/budget/:id',authenticateUser, budgetCtrl.update)
router.get('/user/budget', authenticateUser, budgetCtrl.list)

//Category
router.post('/user/category', authenticateUser, categoryCtrl.create)
router.get('/user/category', authenticateUser, categoryCtrl.list)
router.get('/user/category/:id', authenticateUser, categoryCtrl.show)
router.put('/user/category/:id', authenticateUser, categoryCtrl.update)
router.delete('/user/category/:id', authenticateUser, categoryCtrl.destroy)

//Expense
router.post('/user/expense',checkSchema(expenseValidationSchema), authenticateUser, expenseCtrl.create)
router.get('/user/expense', authenticateUser, expenseCtrl.list)
router.get('/user/expense/:id', authenticateUser, expenseCtrl.show)
router.put('/user/expense/:id', authenticateUser, expenseCtrl.update)
router.get('/user/deletedExpenses', authenticateUser, expenseCtrl.showDeleted)
router.delete('/user/expense/:id', authenticateUser, expenseCtrl.softDelete)
router.get('/user/restoreExpenses/:id', authenticateUser, expenseCtrl.restoreExpense)
router.delete('/user/permanentDeleteExpense/:id', authenticateUser, expenseCtrl.hardDelete)

//Profile
router.put('/user/profile/:id', authenticateUser, upload.single('image'), profileController.update)
router.get('/user/profile', authenticateUser, profileController.show)



module.exports = router