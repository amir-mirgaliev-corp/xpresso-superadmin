class ValidatorBranch {
    static phoneRegex = /^\+998 \d{2} \d{3} \d{2} \d{2}$/;
    static coordinateRegex = /^-?\d+(\.\d+)?$/;

    constructor(branchData) {
        this.branchName = branchData.branchName.value;
        this.lang = branchData.lang.value;
        this.log = branchData.log.value;
        this.phone = branchData.phone.value;
    }

    validateField(value, regex, emptyMessage, invalidMessage) {
        if (!value) {
            return {
                isValid: false,
                message: emptyMessage,
            };
        }

        if (!regex.test(value)) {
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

    validateBranchName() {
        return this.validateField(
            this.branchName,
            /.+/,
            "Название филиала не может быть пустым",
            "Название филиала некорректно"
        );
    }

    validateLang() {
        return this.validateField(
            this.lang,
            ValidatorBranch.coordinateRegex,
            "Долгота не может быть пустой",
            "Долгота должна быть числом"
        );
    }

    validateLog() {
        return this.validateField(
            this.log,
            ValidatorBranch.coordinateRegex,
            "Широта не может быть пустой",
            "Широта должна быть числом"
        );
    }

    validatePhone() {
        return this.validateField(
            this.phone,
            ValidatorBranch.phoneRegex,
            "Номер телефона не может быть пустым",
            "Номер телефона должен быть в формате +998 00 000 00 00"
        );
    }
}

export default ValidatorBranch;