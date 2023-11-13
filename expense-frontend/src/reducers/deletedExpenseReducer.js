const initialState = []

const deletedExpenseReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_DELETED_EXPENSES': {
            return [...action.payload]
        }
        case 'DELETED_EXPENSES': {
            return [...action.payload]
        }
        case 'RESTORE_EXPENSE': {
            return [...state, { ...action.payload }]
        }
        default: {
            return [...state]
        }
    }
}

export default deletedExpenseReducer