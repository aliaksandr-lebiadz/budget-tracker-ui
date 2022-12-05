class OnboardingService {

    static isUsernameValid = (username?: string) => username !== undefined && username.length >= 6 && username.length <= 32;

    static isPasswordValid = (password?: string) => password !== undefined && password.length >= 8 && password.length <= 32;

    static validationMethods = {
        username: OnboardingService.isUsernameValid,
        password: OnboardingService.isPasswordValid,
    };

    // @ts-ignore
    static isValid = (name: string, value?: string) => this.validationMethods[name](value);
};

export default OnboardingService;