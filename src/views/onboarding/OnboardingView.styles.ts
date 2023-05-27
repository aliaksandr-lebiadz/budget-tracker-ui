import BackgroundImage from '../../images/onboarding-page-background.png';
import { Color, FontFamily, FontWeight } from '../../properties';

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

        wrapper: {
            width: '350px',
            height: '450px',
            position: 'absolute',
            top: '0px',
            bottom: '0px',
            left: '0px',
            right: '0px',
            margin: 'auto',
        },

        title: {
            
            wrapper: {
                height: '120px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            },

            text: {
                fontFamily: FontFamily.RALEWAY,
                fontWeight: FontWeight.BLACK,
                fontSize: '30px',
                textTransform: 'uppercase',
            },
        },

        content: {

            wrapper: {
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
                    fontFamily: FontFamily.RALEWAY,
                    fontWeight: FontWeight.SEMI_BOLD,
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
                    fontFamily: FontFamily.RALEWAY,
                    fontWeight: FontWeight.SEMI_BOLD,
                    backgroundColor: Color.WHITE,
                    margin: '0px',
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
                },
            },

            hint: {
                fontFamily: FontFamily.RALEWAY,
                fontWeight: FontWeight.REGULAR,
                fontSize: '14px',
                color: Color.GREY,
                textAlign: 'center',
                position: 'absolute',
                bottom: '15px',
                width: 'inherit',
    
                a: {
                    color: Color.GREY,
                    textDecorationThickness: 0.1,
    
                    '&:hover': {
                        color: Color.DARK_PINK,
                    },
                },
            },
        },
    },
};

export default styles;