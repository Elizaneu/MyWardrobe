import {createThing} from "../API/ThingAPI";

const SET_CREATE = "SET_CREATE_THING_REDUCER"
const SET_MESSAGE = "SET_MESSAGE_THING_REDUCER"

const initialState = {
    isCreated: false,
    message: "",
}

const thingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CREATE:
            return {
                ...state,
                isCreated: action.isCreated
            }
        case SET_MESSAGE:
            return {
                ...state,
                message: action.message
            }
        default:
            return state;
    }
}

const setMessage = (message) => ({type: SET_MESSAGE, message})
export const setCreate = (isCreated) => ({type: SET_CREATE, isCreated})

export const CreateThing = (Photo, Category) => async (dispatch) => {

    let data = await createThing(Photo, Category);

    if (data.isCreated)
        dispatch(setCreate(data.isCreated))
    else {
        dispatch(setMessage(data.error))
    }
}

export default thingReducer