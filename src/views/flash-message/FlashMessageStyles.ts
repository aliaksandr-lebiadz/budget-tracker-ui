import { Color } from '../../properties/Color';
import FontFamily from '../../properties/FontFamily';
import { FlashMessageType } from '../../store/flash-message/types';

const styles = {
    root: {
        minWidth: '350px',
        position: 'absolute',
        left: 20,
        bottom: 0,
        zIndex: 1000,
    },
    wrapper: {
        height: '55px',
        width: 'fit-content',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '15px',
    },
    line: (type: FlashMessageType) => ({
        height: '100%',
        width: '5px',
        backgroundColor: type === FlashMessageType.SUCCESS
            ? Color.LIGHT_GREEN : FlashMessageType.INFO ? Color.LIGHT_BLUE
            : Color.LIGHT_RED,
        borderBottomLeftRadius: 'inherit',
        borderTopLeftRadius: 'inherit',
        alignSelf: 'stretch',
    }),
    statusIconWrapper: {
        width: '30px',
        display: 'flex',
        justifyContent: 'center',
        margin: '0 7px',
    },
    textWrapper: (expanded: boolean) => ({
        minWidth: '300px',
        width: expanded ? 'auto': '300px',
        userSelect: 'none',
    }),
    textTitle: {
        fontFamily: FontFamily.RALEWAY_SEMI_BOLD,
        textTransform: 'capitalize',
        lineHeight: 1.2,
    },
    textContent: {
        fontFamily: FontFamily.RALEWAY_REGULAR,
        lineHeight: 1.2,
        fontSize: '14px',
        color: Color.GREY,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        cursor: 'pointer',
    },
    closeIconWrapper: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        cursor: 'pointer',
        margin: '0 7px',
    },
};

export default styles;
