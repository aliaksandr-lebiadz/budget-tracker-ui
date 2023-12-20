import { darken, lighten } from '@mui/material';
import { Color, FontWeight, TransparentColor } from '../../properties';
import FontFamily from '../../properties/FontFamily';

const styles = {

    paper: {
        backgroundColor: darken(Color.GREY, 0.5),
    },

    title: {
        color: darken(Color.WHITE, 0.1),
        backgroundColor: darken(Color.GREY, 0.6),
        padding: '10px 24px',
        fontFamily: FontFamily.RALEWAY,
        fontWeight: FontWeight.SEMI_BOLD,
    },

    content: {

        wrapper: {
            marginTop: '20px',
        },

        text: {
            color: darken(Color.WHITE, 0.1),
            fontFamily: FontFamily.RALEWAY,
            fontWeight: FontWeight.REGULAR,
        },
    },

    actions: {

        closeButton: {
            fontFamily: FontFamily.RALEWAY,
            fontWeight: FontWeight.SEMI_BOLD,
            color: lighten(TransparentColor.LIGHT_GREY, 0.2),
            textTransform: 'none',

            '&:hover': {
                backgroundColor: darken(TransparentColor.GREY, 0.2),
            },
        },

        confirmButton: {
            fontFamily: FontFamily.RALEWAY,
            fontWeight: FontWeight.SEMI_BOLD,
            backgroundColor: Color.LIGHT_RED,
            color: darken(Color.WHITE, 0.1),
            border: 'none',
            textTransform: 'none',

            '&:hover': {
                border: 'none',
                backgroundColor: darken(Color.LIGHT_RED, 0.1),
            },
        },
    },
};

export default styles;