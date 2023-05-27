import { Color, FontFamily, FontWeight } from '../../properties';

const styles = {

    rememberMe: {

        checkbox: {
            color: Color.DARK_PINK,
            marginLeft: '3px',
            marginRight: '-3px',
            
            '&.Mui-checked': {
                color: Color.DARK_PINK,
            },
        },

        label: {
            fontFamily: FontFamily.RALEWAY,
            fontWeight: FontWeight.REGULAR,
            color: Color.GREY,
            fontSize: '14px',
        },
    },
};

export default styles;