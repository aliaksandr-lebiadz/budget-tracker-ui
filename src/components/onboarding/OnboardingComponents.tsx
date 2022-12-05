import {
    Paper,
    Typography,
    Box,
    TextField,
    InputAdornment,
    Button,
} from '@mui/material';
import { styled } from '@mui/system';

//@ts-ignore
import BackgroundImage from '../../images/onboarding-page-background.png';
import Color from '../../properties/Color';
import FontFamily from '../../properties/FontFamily';

export const OnboardingPageBackground = styled(Box)({
    height: '100vh',
    background: `-webkit-linear-gradient(bottom, #0250c5, #d43f8d)`,

    '&::before': {
        content: `""`,
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: `url(${BackgroundImage}) no-repeat center`,
        backgroundSize: 'cover',
    }
});

export const OnboardingDialog = styled(Paper)({
    width: 350,
    height: 450,

    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

    margin: 'auto',
});

export const OnboardingTitleBox = styled(Box)({
    height: 120,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export const OnboardingTitleTypography = styled(Typography)({
    fontFamily: FontFamily.RALEWAY_BLACK,
    fontSize: 30,
    textTransform: 'uppercase',
});

export const OnboardingContentBox = styled(Box)({
    width: 250,
    margin: 'auto',
});

export const OnboardingFormControl = styled('form')({
    width: '100%',
});

export const OnboardingTextField = styled(TextField)({
    marginTop: 13,
    background: Color.LIGHT_GREY,
    width: '100%',
    borderRadius: 3,
    '.MuiFilledInput-root': {
        fontFamily: FontFamily.RALEWAY_SEMI_BOLD,
        color: Color.DARK_GREY,
        borderRadius: 'inherit',

        input: {
            fontSize: 14,
            padding: '12px 0',
        },

        '&.Mui-focused': {
            '.MuiInputAdornment-root': {
                transform: 'translate(-5px)',
                svg: {
                    fill: Color.DARK_PINK,
                },
            },
        },
    },
    '.MuiFormHelperText-root': {
        fontFamily: FontFamily.RALEWAY_SEMI_BOLD,
        backgroundColor: Color.WHITE,
        margin: 0,
        paddingLeft: 10,
    },
});

export const OnboardingInputAdornment = styled(InputAdornment)({
    marginTop: '0 !important',
    marginLeft: 3,
    transition: 'all .4s',
});

export const OnboardingButton = styled(Button)({
    display: 'block',
    width: '100%',
    marginTop: 20,
    backgroundColor: Color.DARK_PINK,

    '&:hover': {
        backgroundColor: Color.LIGHT_BLACK,
    }
});

export const OnboardingHint = styled(Typography)({
    fontFamily: FontFamily.RALEWAY_REGULAR,
    fontSize: 14,
    color: Color.GREY,
    textAlign: 'center',
    position: 'absolute',
    bottom: 15,
    width: 'inherit',

    a: {
        color: Color.GREY,
        textDecorationThickness: 0.1,

        '&:hover': {
            color: Color.DARK_PINK,
        },
    },
});