import {getAuth, login, logout} from "../API/UserAPI";

const SET_AUTH = "SET_AUTH_USER_REDUCER"
const SET_MESSAGE = "SET_MESSAGE_USER_REDUCER"
const SET_CURRENT_USER = "SET_CURRENT_USER_REDUCER"

const initialState = {
    isAuth: false,
    message: "",
    currentUser:{}
}

const userReducer = (state = initialState, action) =>{
    switch(action.type){
        case SET_AUTH:
            return{
                ...state,
                isAuth: action.isAuth
            }
        case SET_MESSAGE:
            return {
                ...state,
                message: action.message
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.currentUser
            }
        default:
            return state
    }
}

const setAuth = (isAuth) => ({type:SET_AUTH, isAuth})
const setMessage = (message) => ({type:SET_MESSAGE, message})
const setCurrentUser = (currentUser) => ({type:SET_CURRENT_USER, currentUser})

export const Login = (Email, Password, rememberMe) => async (dispatch) =>{
    let data = await login(Email, Password, rememberMe);

    if (!data.isAuth) {
        dispatch(setMessage(data.message))
        setTimeout(()=>{dispatch(setMessage(""))}, 1000)
    }
    else{
        const user = {
            ...data,
            isAuth: null
        }
        dispatch(setCurrentUser(user));
    }
    dispatch(setAuth(data.isAuth));
}

export const IsAuth = () => async (dispatch) => {
    let data = await getAuth();

    if (data.isAuth) {
        const user = {
            ...data,
            isAuth: null
        }
        dispatch(setCurrentUser(user));
    }
    dispatch(setAuth(data.isAuth));
}

export const Logout = () => async (dispatch) => {
    let data = await logout();

    if (!data.isAuth) {
        dispatch(setAuth(false));
        dispatch(setCurrentUser({}));
    }
}

export default userReducer