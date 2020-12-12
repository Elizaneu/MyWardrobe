const SET_ERROR = "SET_CREATE_ERROR_REDUCER"

const initialState = {
    error: false
}

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export const setError = () => ({type:SET_ERROR});

export default errorReducer;