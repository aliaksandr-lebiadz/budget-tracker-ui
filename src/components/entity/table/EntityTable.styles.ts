import { darken, lighten } from '@mui/material';
import { Color, TransparentColor, FontFamily, FontWeight } from '../../../properties';

const styles = {

    root: {
        margin: '50px',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px',
    },

    header: {

        wrapper: {
            display: 'flex',
            columnGap: '20px',
            alignItems: 'center',
        },

        title: {
            color: darken(Color.WHITE, 0.1),
            fontFamily: 'Raleway',
            fontWeight: '600',
            //fontFamily: FontFamily.RALEWAY_SEMI_BOLD,
            fontSize: '24px',
        },

        button: {

            wrapper: {
                marginLeft: 'auto',
                padding: '0px',
                height: '40px',
                display: 'flex',
                columnGap: '10px',
                color: darken(Color.WHITE, 0.1),
                fontFamily: FontFamily.RALEWAY,
                fontWeight: FontWeight.SEMI_BOLD,
                backgroundColor: darken(Color.LIGHT_GREEN, 0.1),
                textTransform: 'none',

                '&:hover': {
                    backgroundColor: darken(Color.LIGHT_GREEN, 0.1),
                },
            },

            text: {
                fontFamily: FontFamily.RALEWAY,
                fontWeight: FontWeight.SEMI_BOLD,
                padding: '10px 10px 10px 20px',
            },

            iconWrapper: {
                height: '100%', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0px 10px',
                backgroundColor: darken(Color.LIGHT_GREEN, 0.2),
                border: 'inherit',
                borderTopRightRadius: '4px',
                borderBottomRightRadius: '4px',
            },
        },
    },

    table: {

        wrapper: {
            backgroundColor: Color.DARK_BLUE,
            borderRadius: '10px',
            width: '500px',
            overflow: 'hidden',
            minHeight: '474px',
        },

        head: {

            content: {

                wrapper: {
                    backgroundColor: lighten(Color.DARK_BLUE, 0.05),
                },

                cell: {
                    color: Color.GREY,
                    fontFamily: FontFamily.RALEWAY,
                    fontWeight: FontWeight.SEMI_BOLD,
                    borderColor: TransparentColor.GREY,
                },
            },
        },

        body: {

            wrapper: {
                height: '365px',
                overflow: 'hidden',

                '&:hover': {
                    overflow: 'overlay',
                },

                '&::-webkit-scrollbar': {
                    width: '5px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: TransparentColor.LIGHT_GREY,
                    borderRadius: '3px',
                },
            },

            content: {

                wrapper: {
                    backgroundColor: lighten(Color.DARK_BLUE, 0.05),
                },

                row: {
                    display: 'flex',
                },
            },
        },

        pagination: {
            color: darken(Color.WHITE, 0.1),
            border: 'none',
            display: 'block',

            '.MuiSelect-icon': {
                color: darken(Color.WHITE, 0.1),
            },
            '.MuiIconButton-root': {
                color: darken(Color.WHITE, 0.1),
            },
            '.Mui-disabled': {
                color: TransparentColor.GREY,
            },
        },
    },
};

export default styles;
