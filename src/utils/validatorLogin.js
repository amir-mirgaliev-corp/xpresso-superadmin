export default class Validator {
    static loginRegex = /^[a-z0-9_@]+$/;
    static passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-,.])[A-Za-z\d@$!%*?&\-,.]{8,}$/;

    constructor({ login, password, phone }) {
        this.login = login;
        this.password = password;
        this.phone = phone;
    }

    validateField(value, regex, emptyMessage, invalidMessage, allowEmpty = false) {
        if (!allowEmpty && !value) {
            return {
                isValid: false,
                message: emptyMessage,
            };
        }

        if (value && !regex.test(value)) {
            return {
                isValid: false,
                message: invalidMessage,
            };
        }

        return { 
            isValid: true, 
            message: null 
        };
    }

    validateLogin (allowEmpty=false) {
        return this.validateField(
            this.login,
            Validator.loginRegex,
            "Логин не может быть пустым",
            "Логин может содержать только латиницу, цифры, подчеркивание и @",
            allowEmpty
        );
    }

    validatePassword (allowEmpty=false) {
        return this.validateField(
            this.password,
            Validator.passwordRegex,
            "Пароль не может быть пустым",
            "Пароль должен содержать минимум 8 символов, включая строчные, заглавные буквы, цифры и специальные символы",
            allowEmpty
        );
    }

    validatePhone() {
        return {
            isValid: true,
            message: null,
        };
    }
}
