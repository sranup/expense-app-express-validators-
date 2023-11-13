import axios from 'axios'

export const asyncAddExpense = (data) => {
    return (dispatch) => {
        axios.post('http://localhost:3100/user/expense', data, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const expenseData = response.data
                if (expenseData.hasOwnProperty('errors')) {
                    alert(expenseData.message)
                } else {
                    dispatch(addExpense(expenseData))
                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

const addExpense = (data) => {
    return {
        type: "ADD_EXPENSE",
        payload: data
    }
}


export const asyncGetExpenses = () => {
    return (dispatch) => {
        axios.get('http://localhost:3100/user/expense', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const expensesData = response.data
                const filteredData = expensesData.filter((ele) => !ele.deleted)
                if (expensesData.hasOwnProperty('errors')) {
                    alert(expensesData.message)
                } else {
                    dispatch(getExpenses(filteredData))
                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

const getExpenses = (data) => {
    return {
        type: 'GET_EXPENSES',
        payload: data
    }
}

export const asyncRemoveExpense = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3100/user/expense/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const expenseData = response.data
                console.log('expenseData', expenseData)
                if (expenseData.hasOwnProperty('errors')) {
                    alert(expenseData.message)
                } else {
                    dispatch(removeExpense(expenseData))
                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

const removeExpense = (expenseData) => {
    return {
        type: "REMOVE_EXPENSE",
        payload: expenseData
    }
}

export const asyncEditExpense = (id, data) => {
    return (dispatch) => {
        axios.put(`http://localhost:3100/user/expense/${id}`, data, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const expenseData = response.data
                if (expenseData.hasOwnProperty('errors')) {
                    alert(expenseData.message)
                } else {
                    dispatch(editExpense(expenseData))
                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

const editExpense=(data)=>{
    return{
        type:'UPDATE_EXPENSE',
        payload:{
            id:data._id,
            body:data
        }
    }
}