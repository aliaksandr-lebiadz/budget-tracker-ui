class CardTypeService {

    private static nameRules = {
        minLength: 4,
        maxLength: 64,
    };

    private static iconRules = {
        maxWidth: 48,
        maxHeight: 48,
    };

    static isNameValid = (name?: string) => name !== undefined && name.length >= this.nameRules.minLength && name.length <= this.nameRules.maxLength;

    static isIconValid = (width: number, height: number) => width <= this.iconRules.maxWidth && height <= this.iconRules.maxHeight;

    static messages = {
        invalidName: `Length should be from ${this.nameRules.minLength} to ${this.nameRules.maxLength}`,
        invalidIcon: `Icon dimensions shouldn't exceed ${this.iconRules.maxWidth}x${this.iconRules.maxHeight}`,
    };
};

export default CardTypeService;