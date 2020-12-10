const post = () => {
    return "login successful";
}

export default function login(Email, Password, rememberMe = true) {
    let re = /\S+@\S+\.\S+/
    if ((Email.trim() === "" || !re.test(Email)) && (Password.length < 8))
        return "invalid email and password"
    if (Email.trim() == "" || !re.test(Email))
        return "invalid email"
    if (Password.length < 8)
        return "invalid password"
    return post();
}
