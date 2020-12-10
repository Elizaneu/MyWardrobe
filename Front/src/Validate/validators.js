export const maxLength = (maxLength) => (data) => {
    if(!data) return undefined
    if (data.length <= maxLength)
        return undefined
    else
        return `Максимальная длина ${maxLength} символов`
}

export const minLength = (minLength) => (data) => {
    if (!data) return undefined
    if (data.length >= minLength)
        return undefined
    else
        return `Минимальная длина ${minLength} символов`
}

export const require = data => {
    if (data && data.length > 0 && data.trim() !== '') return undefined
    return "Поле не может быть пустым"
}

export const SpaceCheck = data => {
    if(!data) return undefined
    for (let i = 0; i < data.length; i++){
        if (data.charAt(i) ===" ") return "Поле не может содержать пробелы"
    }
    return undefined
}