import { Color, TransparentColor } from '../../../properties/Color';
import FontFamily from '../../../properties/FontFamily';

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '5px',
    },
    header: {
        textTransform: 'uppercase',
        fontFamily: FontFamily.RALEWAY_SEMI_BOLD,
        color: Color.GREY,
        fontSize: '12px',
        marginLeft: '5px',
    },
    divider: {
        borderColor: TransparentColor.GREY,
        margin: '0 20px',
    },
};

export default styles;
