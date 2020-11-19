import * as axios from "axios"

const URL = "http://localhost:8000"

const ms = axios.create({
    baseURL: URL,
    withCredentials: true
})


export const createThing = (Photo, Category) => {
    let formData = new FormData();

    formData.append("Photo", Photo);
    formData.append("Category", Category);

    return ms.post('/thing/', formData, {headers:{
            'Content-Type':'multipart/form-data'
            }}).then(res=>res.data)
}

export const getThing = (Category) => {
    return ms.get(`/thing/?category=${Category}`).then(res=>res.data)
}

export const deleteThing = (idThing) => {
    return ms.delete(`/thing/${idThing}`).then(res=>res.data)
}