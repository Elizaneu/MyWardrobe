import login from './login';
import register from "./register";

describe("testing auth", () => {

    it("with invalid email", () => {
        let inv_email = "test"
        let password = "test1234"
        let result = login(inv_email, password)
        expect(result).toBe("invalid email")
    })

    it("with invalid email (empty)", () => {
        let inv_email = ""
        let password = "test1234"
        let result = login(inv_email, password)
        expect(result).toBe("invalid email")
    })

    it("with invalid password (less than 8 symbols)", () => {
        let email = "test@test.test"
        let inv_password = "test"
        let result = login(email, inv_password)
        expect(result).toBe("invalid password")
    })

    it("with invalid password (empty)", () => {
        let email = "test@test.test"
        let inv_password = ""
        let result = login(email, inv_password)
        expect(result).toBe("invalid password")
    })

    it("with invalid email and password (empty)", () => {
        let inv_email = ""
        let inv_password = ""
        let result = login(inv_email, inv_password)
        expect(result).toBe("invalid email and password")
    })

    it("with invalid email and password", () => {
        let inv_email = "test"
        let inv_password = "test"
        let result = login(inv_email, inv_password)
        expect(result).toBe("invalid email and password")
    })

    it("with email and password", () => {
        let email = "test@test.test"
        let password = "test12345"
        let result = login(email, password)
        expect(result).toBe("login successful")
    })
})

describe("testing register", () => {

    it ("with empty field email", () => {
        let email = ""
        let password = "test1234"
        let firstName = "Лиза"
        let lastName = "Неумоина"
        let result = register(lastName, firstName, email, password)
        expect(result).toBe("fields must not be empty")
    })

    it ("with empty field password", () => {
        let email = "test@test.test"
        let password = ""
        let firstName = "Лиза"
        let lastName = "Неумоина"
        let result = register(lastName, firstName, email, password)
        expect(result).toBe("fields must not be empty")
    })

    it ("with empty field first name", () => {
        let email = "test@test.test"
        let password = "test1234"
        let firstName = ""
        let lastName = "Неумоина"
        let result = register(lastName, firstName, email, password)
        expect(result).toBe("fields must not be empty")
    })

    it ("with empty field password", () => {
        let email = "test@test.test"
        let password = "test1234"
        let firstName = "Лиза"
        let lastName = ""
        let result = register(lastName, firstName, email, password)
        expect(result).toBe("fields must not be empty")
    })

    it ("with empty fields", () => {
        let email = ""
        let password = ""
        let firstName = ""
        let lastName = ""
        let result = register(lastName, firstName, email, password)
        expect(result).toBe("fields must not be empty")
    })

    it("with invalid email", () => {
        let inv_email = "test"
        let password = "test1234"
        let firstName = "Лиза"
        let lastName = "Неумоина"
        let result = register(lastName, firstName, inv_email, password)
        expect(result).toBe("invalid email")
    })

    it("with invalid password (less than 8 symbols)", () => {
        let email = "test@test.test"
        let inv_password = "test"
        let firstName = "Лиза"
        let lastName = "Неумоина"
        let result = register(lastName, firstName, email, inv_password)
        expect(result).toBe("invalid password")
    })

    it("with invalid first name", () => {
        let firstName = "йфячыцувсмакепитрноьглбшщджюхзъъ"
        let lastName = "Неумоина"
        let email = "test@test.test"
        let password = "test12345"
        let result = register(lastName, firstName, email, password)
        expect(result).toBe("last name and first name must not contain more than 30 symbols")
    })

    it("with invalid last name", () => {
        let lastName = "йфячыцувсмакепитрноьглбшщджюхзъъ"
        let firstName = "Лиза"
        let email = "test@test.test"
        let password = "test12345"
        let result = register(lastName, firstName, email, password)
        expect(result).toBe("last name and first name must not contain more than 30 symbols")
    })

    it ("with not correct field first name (not cyrillic)", () => {
        let email = "test@test.test"
        let password = "test1234"
        let firstName = "ooh"
        let lastName = "Неумоина"
        let result = register(lastName, firstName, email, password)
        expect(result).toBe("fields first name and last name must be cyrillic")
    })

    it ("with not correct field last name (not cyrillic)", () => {
        let email = "test@test.test"
        let password = "test1234"
        let firstName = "Лиза"
        let lastName = "ohh"
        let result = register(lastName, firstName, email, password)
        expect(result).toBe("fields first name and last name must be cyrillic")
    })

    it("with valid data", () => {
        let firstName = "Лиза"
        let lastName = "Неумоина"
        let email = "test@test.test"
        let password = "test12345"
        let result = register(lastName, firstName, email, password)
        expect(result).toBe("register successful")
    })

    it("with mix of invalid data", () => {
        let firstName = "test"
        let lastName = "test"
        let email = "test"
        let password = "test"
        let result = register(lastName, firstName, email, password)
        expect(result).toBe("fn & ln should be cyrillic and contain " +
            "less than 30 symbols; email should be in format test@test.test;" +
            "password should be longer than 8 symbols")
    })
})