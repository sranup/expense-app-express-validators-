const initialState = {}

const budgetReducer = (state = initialState, action) => {
    switch (action.type) {

        case "SET_BUDGET": {
            return { ...state, ...action.payload }
        }

        case "UPDATED_BUDGET": {
            return { ...state, ...action.payload }
        }
        default: {
            return { ...state }
        }
    }
}

export default budgetReducer