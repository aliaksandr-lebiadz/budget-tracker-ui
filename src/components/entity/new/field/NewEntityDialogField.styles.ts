import { darken } from '@mui/material';
import { Color, FontFamily, FontWeight, TransparentColor } from '../../../../properties';

const styles = {
    
    root: {
        display: 'flex',
        columnGap: '20px',
        alignItems: 'center',
    },

    label: {
        color: darken(Color.WHITE, 0.1),
        fontFamily: FontFamily.RALEWAY,
        fontWeight: FontWeight.SEMI_BOLD,
        width: '50px',
        textAlign: 'right',
    },

    textField: {
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
            width: '100%',
        },

        input: {
            color: darken(Color.WHITE, 0.2),
            padding: '7px 14px',
        },
    },

    upload: {

        wrapper: {
            display: 'flex',
            columnGap: '30px',
            alignItems: 'center',
            width: '220px',
        },

        pictureWrapper: (filled: boolean, error: boolean) => ({
            width: '48px',
            height: '48px',
            border: `2px dashed ${filled ? Color.DARK_GREY : (error ? darken(Color.LIGHT_RED, 0.2) : darken(Color.WHITE, 0.6))}`,
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
        }),

        button: {
            display: 'flex',
            columnGap: '10px',
            color: darken(Color.WHITE, 0.1),
            backgroundColor: darken(Color.LIGHT_GREEN, 0.1),
            border: 'none',
            textTransform: 'none',
            width: '142px',
            height: '36px',

            '&:hover': {
                border: 'none',
                backgroundColor: darken(Color.LIGHT_GREEN, 0.2),
            },
        },

        text: {
            fontFamily: FontFamily.RALEWAY,
            fontWeight: FontWeight.SEMI_BOLD,
            color: darken(Color.WHITE, 0.1),
        },
    }
};

export default styles;
