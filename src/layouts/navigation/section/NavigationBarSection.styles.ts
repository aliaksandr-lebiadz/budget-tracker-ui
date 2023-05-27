import { Color, TransparentColor, FontFamily, FontWeight } from '../../../properties';

const styles = {

    root: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '5px',
    },

    header: {
        textTransform: 'uppercase',
        fontFamily: FontFamily.RALEWAY,
        fontWeight: FontWeight.SEMI_BOLD,
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
