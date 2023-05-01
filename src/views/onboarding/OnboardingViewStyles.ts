//@ts-ignore
import BackgroundImage from '../../images/onboarding-page-background.png';
import { Color } from '../../properties/Color';
import FontFamily from '../../properties/FontFamily';

const styles = {
    root: {
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
    },
    dialog: {
        width: '350px',
        height: '450px',

        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,

        margin: 'auto',
    },
    titleWrapper: {
        height: '120px',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontFamily: FontFamily.RALEWAY_BLACK,
        fontSize: '30px',
        textTransform: 'uppercase',
    },
    contentWrapper: {
        width: '250px',
        margin: 'auto',
    },
    form: {
        width: '100%',
    },
    textField: {
        marginTop: '13px',
        background: Color.LIGHT_GREY,
        width: '100%',
        borderRadius: '3px',
        '.MuiFilledInput-root': {
            fontFamily: FontFamily.RALEWAY_SEMI_BOLD,
            color: Color.DARK_GREY,
            borderRadius: 'inherit',

            input: {
                fontSize: '14px',
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
            paddingLeft: '10px',
        },
    },
    iconWrapper: {
        marginTop: '0 !important',
        marginLeft: '3px',
        transition: 'all .4s',
    },
    button: {
        display: 'block',
        width: '100%',
        marginTop: '20px',
        backgroundColor: Color.DARK_PINK,

        '&:hover': {
            backgroundColor: Color.LIGHT_BLACK,
        }
    },
    hint: {
        fontFamily: FontFamily.RALEWAY_REGULAR,
        fontSize: '14px',
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
    },
};

export default styles;
