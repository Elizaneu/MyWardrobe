import {setError} from "./errorReducer"
import {deleteUser, editUser, getAuth, getUser, login, logout, register} from "../API/UserAPI";


const SET_AUTH = "SET_AUTH_USER_REDUCER"
const SET_CREATE = "SET_CREATE_USER_REDUCER"
const SET_MESSAGE = "SET_MESSAGE_USER_REDUCER"
const SET_CURRENT_USER = "SET_CURRENT_USER_REDUCER"
const SET_UPDATE = "SET_UPDATE_USER_REDUCER"

const initialState = {
    isAuth: true,
    isCreated: false,
    isEdited: false,
    message: "",
    currentUser: {}
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                isAuth: action.isAuth
            }
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
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.currentUser
            }
        case SET_UPDATE:
            return {
                ...state,
                isEdited: action.isEdited
            }
        default:
            return state
    }
}

export const setAuth = (isAuth) => ({type: SET_AUTH, isAuth})
export const setMessage = (message) => ({type: SET_MESSAGE, message})
export const setCurrentUser = (currentUser) => ({type: SET_CURRENT_USER, currentUser})
export const setCreate = (isCreated) => ({type: SET_CREATE, isCreated})
export const setUpdate = (isEdited) => ({type: SET_UPDATE, isEdited})

export const Login = (Email, Password, rememberMe) => async (dispatch) => {
    try {
        let data = await login(Email.trim(), Password, rememberMe);

        if (!data.isAuth) {
            dispatch(setMessage(data.error))
            setTimeout(() => {
                dispatch(setMessage(""))
            }, 1000)
        } else {
            const user = {
                ...data,
                isAuth: null
            }
            dispatch(setCurrentUser(user));
        }
        dispatch(setAuth(data.isAuth));
    } catch (e) {
        dispatch(setError())
    }
}

export const IsAuth = () => async (dispatch) => {
    try {
        let data = await getAuth();

        if (data.isAuth) {
            const user = {
                ...data,
                isAuth: null
            }
            dispatch(setCurrentUser(user));
        }
        dispatch(setAuth(data.isAuth));
    } catch (e) {
        dispatch(setError());
    }
}

export const Logout = () => async (dispatch) => {
    try {
        let data = await logout();


        if (!data.isAuth) {
            dispatch(setAuth(false));
            dispatch(setCurrentUser({}));
        }
    }catch (e){
        dispatch(setError())
    }
}

export const Register = (LastName, FirstName, Email, Password) => async (dispatch) => {
    try {
        let data = await register(LastName, FirstName, Email, Password);

        if (!data.isCreated) {
            dispatch(setMessage(data.error));
            setTimeout(() => {
                dispatch(setMessage(""))
            }, 1000);
        } else
            dispatch(setCreate(data.isCreated))
    } catch (e) {
        dispatch(setMessage(e.response.data.error));
        setTimeout(() => {
            dispatch(setMessage(""))
        }, 1000);
    }
}

export const DeleteUser = () => async (dispatch) => {
    try {
        let data = await deleteUser();

        if (!data.isDeleted) {
            dispatch(setMessage(data.error));
            setTimeout(() => {
                dispatch(setMessage(""))
            }, 1000);
        } else {
            dispatch(setAuth(false))

            dispatch(setCurrentUser(undefined))
        }
    }catch (e){
        dispatch(setError())
    }
}

export const EditUser = (LastName = undefined,
                         FirstName = undefined,
                         Email = undefined,
                         Password = undefined) => async (dispatch) => {
    try {
        let data = await editUser(LastName, FirstName, Email, Password);
        if (!data.isEdited) {
            dispatch(setMessage(data.error));
            setTimeout(() => {
                dispatch(setMessage(""))
            }, 1000);
        } else {
            dispatch(setUpdate(data.isEdited))
            let user = await getUser()
            dispatch(setCurrentUser(user))
        }
    }catch (e){
        dispatch(setError())
    }
}

export default userReducer