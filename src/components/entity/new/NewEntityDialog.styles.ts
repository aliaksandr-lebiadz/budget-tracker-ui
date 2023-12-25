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