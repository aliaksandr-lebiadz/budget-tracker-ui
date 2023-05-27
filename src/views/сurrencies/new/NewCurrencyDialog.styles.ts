import { darken, lighten } from '@mui/material';
import { Color, TransparentColor, FontFamily, FontWeight } from '../../../properties';

const styles = {

    root: {
        width: '400px',
        height: '100vh',
        position: 'absolute',
        right: '0px',
        top: '0px',
        backgroundColor: Color.DARK_GREY,
    },

    header: {

        wrapper: {
            height: '65px',
            
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '20px',
            borderBottom: `1px solid ${TransparentColor.GREY}`,
        },

        text: {
            color: darken(Color.WHITE, 0.1),
            fontFamily: FontFamily.RALEWAY,
            fontWeight: FontWeight.SEMI_BOLD,
            fontSize: '22px',
        },

        closeIconWrapper: {
            position: 'absolute',
            right: '7px',
            top: '7px',
            color: darken(Color.WHITE, 0.1),
            border: `1px solid ${TransparentColor.GREY}`,
            padding: '4px',

            '&:hover': {
                backgroundColor: TransparentColor.GREY,
            },
        },
    },

    content: {
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            rowGap: '30px',
            padding: '20px 20px',
        },

        textField: {

            wrapper: {
                display: 'flex',
                columnGap: '10px',
                alignItems: 'center',
            },

            label: {
                color: darken(Color.WHITE, 0.1),
                fontFamily: FontFamily.RALEWAY,
                fontWeight: FontWeight.SEMI_BOLD,
                display: 'inline-flex',
                flexBasis: '20%',
            },

            input: {
                '.MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: darken(Color.WHITE, 0.6),
                    },
                    '&:hover fieldset': {
                        borderColor: darken(Color.WHITE, 0.6),
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: darken(Color.WHITE, 0.4),
                    },
                },
        
                '.Mui-error': {
                    '& fieldset': {
                        borderColor: `${darken(Color.LIGHT_RED, 0.3)} !important`,
                    },
                    '&:hover fieldset': {
                        borderColor: darken(Color.LIGHT_RED, 0.3),
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: darken(Color.LIGHT_RED, 0.2),
                    },
                },
        
                '.MuiFormHelperText-root': {
                    position: 'absolute',
                    top: '37px',
                    color: darken(Color.LIGHT_RED, 0.2),
                    fontFamily: FontFamily.RALEWAY,
                    fontWeight: FontWeight.SEMI_BOLD,
                    backgroundColor: darken(TransparentColor.GREY, 0.4),
                    margin: '5px 0px 0px 0px',
                    paddingLeft: '10px',
                    borderRadius: '4px',
                    lineHeight: 1.3,
                    padding: '3px 8px',
                },
        
                input: {
                    color: darken(Color.WHITE, 0.2),
                    padding: '7px 14px',
                },
            },
        },
    },

    actions: {
        
        wrapper: {
            display: 'flex',
            justifyContent: 'center',
            columnGap: '10px',
            marginTop: '10px',
        },

        cancelButton: {
            fontFamily: FontFamily.RALEWAY,
            fontWeight: FontWeight.SEMI_BOLD,
            color: lighten(TransparentColor.LIGHT_GREY, 0.2),
            textTransform: 'none',
            width: '85px',

            '&:hover': {
                backgroundColor: darken(TransparentColor.GREY, 0.5),
            },
        },

        confirmButton: {
            fontFamily: FontFamily.RALEWAY,
            fontWeight: FontWeight.SEMI_BOLD,
            backgroundColor: darken(Color.LIGHT_GREEN, 0.1),
            color: darken(Color.WHITE, 0.1),
            border: 'none',
            textTransform: 'none',
            width: '85px',

            '&:hover': {
                border: 'none',
                backgroundColor: darken(Color.LIGHT_GREEN, 0.2),
            },
        },
    },
};

export default styles;