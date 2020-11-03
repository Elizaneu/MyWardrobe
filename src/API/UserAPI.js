import * as axios from "axios"

const URL = "http://localhost:8000"

const ms = axios.create({
    baseURL: URL,
    withCredentials: true
})

export const login = (email, password, rememberMe = true) => {
    return ms.post('/auth/', {email, password, rememberMe}).then(res=>res.data);
}

export const getAuth = () => {
    return ms.get('/auth/').then(res=>res.data)
}

export const logout = () => {
    return ms.delete('/auth/').then(res=>res.data)
}
