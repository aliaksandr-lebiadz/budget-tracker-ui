import {
    FlashMessagesWrapper,
    FlashMessageWrapper,
    FlashMessageLine,
    FlashMessageStatusIconBox,
    FlashMessageTextBox,
    FlashMessageTextTitle,
    FlashMessageTextContent,
    FlashMessageCloseIconBox,
} from './FlashMessageComponents';

const FlashMessageComponents = {
    Wrapper: FlashMessagesWrapper,
    Message: {
        Wrapper: FlashMessageWrapper,
        Line: FlashMessageLine,
        StatusIconWrapper: FlashMessageStatusIconBox,
        Text: {
            Wrapper: FlashMessageTextBox,
            Title: FlashMessageTextTitle,
            Content: FlashMessageTextContent,
        },
        CloseIconWrapper: FlashMessageCloseIconBox,
    },
};

export default FlashMessageComponents;