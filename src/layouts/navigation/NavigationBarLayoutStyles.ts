import { Color, TransparentColor } from '../../properties/Color';
import FontFamily from '../../properties/FontFamily';

const styles = {
    root: (expanded: boolean) => ({
        width: expanded ? '240px' : '85px',
        height: '100vh',
        borderRight: `1px dashed ${TransparentColor.GREY}`,
        position: 'relative',
        padding: expanded ? '20px' : '20px 7px',
        display: 'flex',
        flexDirection: 'column',
        rowGap: expanded ? '35px' : '15px',
    }),
    toggleButtonWrapper: {
        position: 'absolute',
        right: '-12px',
        top: '28px',
        borderRadius: '50%',
        width: '24px',
        height: '24px',
        minWidth: '24px',
        color: TransparentColor.LIGHT_GREY,
        backgroundColor: Color.DARK_GREY,
        border: `1px dashed ${TransparentColor.GREY}`,

        '&:hover': {
            backgroundColor: Color.DARK_GREY,
        },

        'svg': {
            width: '18px',
            height: '18px',
        },
    },
    logo: {
        width: '40px',
        height: '40px',
        fill: Color.GREEN,
        alignSelf: 'center',
    },
    userInfoWrapper: {
        borderRadius: '12px',
        backgroundColor: TransparentColor.GREY,
        padding: '12px 16px',
        display: 'flex',
        columnGap: '10px',
    },
    userInfoIcon: {
        backgroundColor: Color.LIGHT_GREEN,
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        textAlign: 'center',
        lineHeight: '36px',
        color: Color.WHITE,
        fontSize: '18px',
        fontWeight: 600,
        fontFamily: FontFamily.RALEWAY_SEMI_BOLD,
    },
    userInfoContentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '8px',
    },
    usernameText: {
        color: Color.WHITE,
        fontSize: '13px',
        lineHeight: 1.3,
        fontWeight: 600,
        fontFamily: FontFamily.RALEWAY_SEMI_BOLD,
    },
    roleText: {
        color: Color.GREY,
        fontSize: '11px',
        lineHeight: 1,
        fontWeight: 500,
        fontFamily: FontFamily.RALEWAY_REGULAR,
    },
};

export default styles;
