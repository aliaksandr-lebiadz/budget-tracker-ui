import { darken } from '@mui/material';
import { Color, FontFamily, FontWeight, TransparentColor } from '../../../../properties';

const styles = {
    
    root: {
        color: darken(Color.WHITE, 0.1),
        fontFamily: FontFamily.RALEWAY,
        fontWeight: FontWeight.SEMI_BOLD,
        borderColor: TransparentColor.GREY,
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        columnGap: '13px',
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
        },

        input: {
            color: darken(Color.WHITE, 0.2),
            padding: '7px 14px',
        },
    },

    iconWrapper: {
        color: darken(Color.WHITE, 0.1),

        '&:hover': {
            backgroundColor: TransparentColor.GREY,
        },
    },

    pictureWrapper: {
        width: '48px',
        height: '48px',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export default styles;
