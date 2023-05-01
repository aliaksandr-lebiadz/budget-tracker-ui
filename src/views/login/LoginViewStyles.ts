import { Color } from '../../properties/Color';
import FontFamily from '../../properties/FontFamily';

const styles = {
    rememberMeControl: {
        '.MuiTypography-root': {
            fontFamily: FontFamily.RALEWAY_REGULAR,
            color: Color.GREY,
            fontSize: '14px',
        },
    },
    rememberMeCheckbox: {
        color: Color.DARK_PINK,
        marginLeft: '3px',
        marginRight: '-3px',

        '&.Mui-checked': {
            color: Color.DARK_PINK,
        },
    }
};

export default styles;
