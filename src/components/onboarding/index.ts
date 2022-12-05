import {
    OnboardingPageBackground,
    OnboardingDialog,
    OnboardingTitleBox,
    OnboardingTitleTypography,
    OnboardingContentBox,
    OnboardingFormControl,
    OnboardingTextField,
    OnboardingInputAdornment,
    OnboardingButton,
    OnboardingHint,
} from './OnboardingComponents';

const OnboardingComponents = {
    Wrapper: OnboardingPageBackground,
    Dialog: OnboardingDialog,
    Title: {
        Wrapper: OnboardingTitleBox,
        Text: OnboardingTitleTypography,
    },
    Content: {
        Wrapper: OnboardingContentBox,
        Form: OnboardingFormControl,
        TextField: OnboardingTextField,
        IconWrapper: OnboardingInputAdornment,
        Button: OnboardingButton,
        Hint: OnboardingHint,
    },
};

export default OnboardingComponents;
