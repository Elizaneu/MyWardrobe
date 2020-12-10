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

export const getCollage = (Style = "", Season = "", Dresscode = "", Offset = 0, Limit = 12, Sort = "Likes") => {
    return ms.get(`/collage/?offset=${Offset}&limit=${Limit}&style=${Style}&season=${Season}&dresscode=${Dresscode}&sort=${Sort}`).then(res=>res.data)
}

export const getCollageCategory = (Category = "", Offset= 0, Limit = 6, Sort = "Likes") => {
    return ms.get(`/collage/${Category}?offset=${Offset}&limit=${Limit}&sort=${Sort}`).then(res=>res.data)
}

export const getCollageAll = (Style = "", Season = "", Dresscode = "", Sort = "Likes", Offset = 0, Limit = 6) => {
    return ms.get(`/collage/all/?offset=${Offset}&limit=${Limit}&style=${Style}&season=${Season}&dresscode=${Dresscode}&sort=${Sort}`).then(res=>res.data)
}

export const getCollageAllCategory = (Category = "", Offset= 0, Limit = 6, Sort = "Likes") => {
    return ms.get(`/collage/all/${Category}?offset=${Offset}&limit=${Limit}&sort=${Sort}`).then(res=>res.data)
}

export const getLikedCollage = (Style = "", Season = "", Dresscode = "", Sort = "Likes", Offset = 0, Limit = 12) => {
    return ms.get(`/like/collage/?offset=${Offset}&limit=${Limit}&style=${Style}&season=${Season}&dresscode=${Dresscode}&sort=${Sort}`).then(res=>res.data)
}

export const deleteCollage = (idCollage) => {
    return ms.delete(`/collage/${idCollage}`).then(res=>res.data)
}

export const likeCollage = (id) => {
    return ms.post(`/like/collage/${id}`).then(res=>res.data)
}

export const deleteLike = (id) => {
    return ms.delete(`/like/collage/${id}`).then(res=>res.data)
}