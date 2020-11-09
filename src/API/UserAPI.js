import * as axios from "axios"

const URL = "http://localhost:8000"

const ms = axios.create({
    baseURL: URL,
    withCredentials: true
})

export const login = (Email, Password, rememberMe = true) => {
    return ms.post('/auth/', {Email, Password, rememberMe}).then(res=>res.data);
}

export const getAuth = () => {
    return ms.get('/auth/').then(res=>res.data)
}

export const logout = () => {
    return ms.delete('/auth/').then(res=>res.data)
}

export const register = (LastName, FirstName, Email, Password) => {
    return ms.post('/user/', {LastName, FirstName, Email, Password}).then(res=>res.data);
}