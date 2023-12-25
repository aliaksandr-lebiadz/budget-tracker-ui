class ValidationService {

    static isIntervalLengthValid = (minLength: number, maxLength: number, value?: string) => (
        
        value !== undefined && value.length >= minLength && value.length <= maxLength
    );

    static isPreciseLengthValid = (length: number, value?: string) => (
        
        value !== undefined && value.length === length
    );

    static areDimensionsValid = (maxWidth: number, maxHeight: number, width: number, height: number) => (
        
        width <= maxWidth && height <= maxHeight
    );

    static asInvalidIntervalLengthMessage = (minLength: number, maxLength: number) => (
        `Length should be from ${minLength} to ${maxLength}`
    );

    static asInvalidPreciseLengthMessage = (length: number) => (
        `Length should equal to ${length}`
    );

    static asInvalidDimensionsMessage = (maxWidth: number, maxHeight: number) => (
        `Icon dimensions shouldn't exceed ${maxWidth}x${maxHeight}`
    );
};

export default ValidationService;
