import ValidationService from './ValidationService';

class CurrencyService {

    private static nameRules = {
        minLength: 3,
        maxLength: 64,
    };

    private static codeRules = {
        length: 3,
    };

    static isNameValid = (name?: string) => ValidationService.isIntervalLengthValid(this.nameRules.minLength, this.nameRules.maxLength, name);

    static isCodeValid = (code?: string) => ValidationService.isPreciseLengthValid(this.codeRules.length, code);

    private static validationMethods = {
        name: this.isNameValid,
        code: this.isCodeValid,
    };

    static isValid = (name: 'name' | 'code', value?: string) => this.validationMethods[name](value);

    static messages = {
        invalidName: ValidationService.asInvalidIntervalLengthMessage(this.nameRules.minLength, this.nameRules.maxLength),
        invalidCode: ValidationService.asInvalidPreciseLengthMessage(this.codeRules.length),
    };
};

export default CurrencyService;
