class OnboardingService {

    private static usernameRules = {
        minLength: 6,
        maxLength: 32,
    };

    private static passwordRules = {
        minLength: 8,
        maxLength: 32,
    };

    static isUsernameValid = (username?: string) => username !== undefined && username.length >= this.usernameRules.minLength && username.length <= this.usernameRules.maxLength;

    static isPasswordValid = (password?: string) => password !== undefined && password.length >= this.passwordRules.minLength && password.length <= this.passwordRules.maxLength;

    private static validationMethods = {
        username: this.isUsernameValid,
        password: this.isPasswordValid,
    };

    static isValid = (name: 'username' | 'password', value?: string) => this.validationMethods[name](value);

    static messages = {
        invalidUsername: `Length should be from ${this.usernameRules.minLength} to ${this.usernameRules.maxLength}`,
        invalidPassword: `Length should be from ${this.passwordRules.minLength} to ${this.passwordRules.maxLength}`,
    };
};

export default OnboardingService;