import ValidationService from './ValidationService';

class BankService {

    private static nameRules = {
        minLength: 3,
        maxLength: 128,
    };

    private static iconRules = {
        maxWidth: 48,
        maxHeight: 48,
    };

    static isNameValid = (name?: string) => ValidationService.isIntervalLengthValid(this.nameRules.minLength, this.nameRules.maxLength, name);

    static isIconValid = (width: number, height: number) => ValidationService.areDimensionsValid(this.iconRules.maxWidth, this.iconRules.maxHeight, width, height);

    static messages = {
        invalidName: ValidationService.asInvalidIntervalLengthMessage(this.nameRules.minLength, this.nameRules.maxLength),
        invalidIcon: ValidationService.asInvalidDimensionsMessage(this.iconRules.maxWidth, this.iconRules.maxHeight),
    };
};

export default BankService;
