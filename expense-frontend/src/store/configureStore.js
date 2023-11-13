import { createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../reducers/userReducer'
import budgetReducer from '../reducers/budgetReducer'
import categoryReducer from '../reducers/categoryReducer'
import expenseReducer from '../reducers/expenseReducer'
import profileReducer from '../reducers/profileReducer'
import deletedExpenseReducer from '../reducers/deletedExpenseReducer'
import { applyMiddleware } from 'redux'

const configureStore = () => {
    const store = createStore(combineReducers({
        user: userReducer,
        budget: budgetReducer,
        categories: categoryReducer,
        expenses: expenseReducer,
        profile: profileReducer,
        deletedExpenses: deletedExpenseReducer
    }), applyMiddleware(thunk)) 
    return store
}

export default configureStore