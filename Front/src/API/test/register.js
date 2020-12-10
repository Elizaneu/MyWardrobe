const post = () => {
    return "register successful"
}

export default function register(LastName, FirstName, Email, Password) {
    let re = /\S+@\S+\.\S+/
    if (LastName.trim() === "" || FirstName.trim() === "" ||
        Email.trim() === "" || Password.trim() === "")
        return "fields must not be empty"
    if (LastName.length > 30 || FirstName.length > 30)
        return "last name and first name must not contain more than 30 symbols"
    if (!re.test(Email))
        return "invalid email"
    if (Password.length < 8)
        return "invalid password"
    return post()
}
