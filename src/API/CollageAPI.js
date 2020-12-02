import * as axios from "axios"

const URL = "http://localhost:8000"

const ms = axios.create({
    baseURL: URL,
    withCredentials: true
})


export const createCollage = (Photo, Style, Dresscode, Season, Things) => {
    let formData = new FormData();
    formData.append("Photo", Photo);
    formData.append("Style", Style);
    formData.append("Dresscode", Dresscode);
    formData.append("Season", Season);
    formData.append("Things", JSON.stringify(Things))

    return ms.post("/collage/", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const getCollage = (Category = "", Style = "", Season = "", Dresscode = "", Offset = 0, Limit = 12) => {
    return ms.get(`/collage/?category=${Category}&offset=${Offset}&
    limit=${Limit}&style=${Style}&season=${Season}&dresscode=${Dresscode}`).then(res=>res.data)
}

export const deleteCollage = (idCollage) => {
    return ms.delete(`/collage/${idCollage}`).then(res=>res.data)
}
