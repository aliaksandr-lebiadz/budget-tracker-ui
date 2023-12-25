import ValidationService from './ValidationService';

class OnboardingService {

    private static usernameRules = {
        minLength: 6,
        maxLength: 32,
    };

    private static passwordRules = {
        minLength: 8,
        maxLength: 32,
    };

    static isUsernameValid = (username?: string) => ValidationService.isIntervalLengthValid(this.usernameRules.minLength, this.usernameRules.maxLength, username);

    static isPasswordValid = (password?: string) => ValidationService.isIntervalLengthValid(this.passwordRules.minLength, this.passwordRules.maxLength, password);

    private static validationMethods = {
        username: this.isUsernameValid,
        password: this.isPasswordValid,
    };

    static isValid = (name: 'username' | 'password', value?: string) => this.validationMethods[name](value);

    static messages = {
        invalidUsername: ValidationService.asInvalidIntervalLengthMessage(this.usernameRules.minLength, this.usernameRules.maxLength),
        invalidPassword: ValidationService.asInvalidIntervalLengthMessage(this.passwordRules.minLength, this.passwordRules.maxLength),
    };
};

export default OnboardingService;
