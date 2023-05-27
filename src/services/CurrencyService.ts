class CurrencyService {

    private static nameRules = {
        minLength: 3,
        maxLength: 64,
    };

    private static codeRules = {
        length: 3,
    };

    static isNameValid = (name?: string) => name !== undefined && name.length >= this.nameRules.minLength && name.length <= this.nameRules.maxLength;

    static isCodeValid = (code?: string) => code !== undefined && code.length === this.codeRules.length;

    private static validationMethods = {
        name: this.isNameValid,
        code: this.isCodeValid,
    };

    static isValid = (name: 'name' | 'code', value?: string) => this.validationMethods[name](value);

    static messages = {
        invalidName: `Length should be from ${this.nameRules.minLength} to ${this.nameRules.maxLength}`,
        invalidCode: `Length should equal to ${this.codeRules.length}`,
    };
};

export default CurrencyService;