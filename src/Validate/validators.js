export const maxLength = (maxLength) => (data) => {
    if (data && data.length > maxLength)
        return `Максимальная длина ${maxLength}`
    else
        return undefined
}

export const require = data => {
    return undefined
    return "Поле не может быть пустым"
}