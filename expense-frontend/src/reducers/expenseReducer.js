const initialState = []

const expenseReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_EXPENSE": {
            return [...state, { ...action.payload }]
        }
        case "GET_EXPENSES": {
            return [...action.payload]
        }
        case "DELETED_EXPENSES": {
            return [...action.payload]
        }
        case "REMOVE_EXPENSE": {
            return state.filter((ele) => ele._id !== action.payload._id)
        }
        case "UPDATE_EXPENSE": {
            return state.map((ele) => {
                if (ele._id == action.payload.id) {
                    return { ...ele, ...action.payload.body }
                } else {
                    return { ...ele }
                }
            })
        }

        default: {
            return [...state]
        }
    }
}

export default expenseReducer