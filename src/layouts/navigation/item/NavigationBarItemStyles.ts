import { darken, lighten } from '@mui/material';
import { Color, TransparentColor } from '../../../properties/Color';
import FontFamily from '../../../properties/FontFamily';

export const expandedViewStyles = {
    itemWrapper: (selected: boolean) => ({
        padding: '10px',
        borderRadius: '8px',
        color: selected ? lighten(Color.LIGHT_GREEN, 0.3) : Color.GREY,
        fontSize: '14px',
        fontWeight: selected ? 600 : 500,
        fontFamily: FontFamily.RALEWAY_REGULAR,
        backgroundColor: selected ? TransparentColor.GREEN : 'inherit',

        display: 'flex',
        alignItems: 'center',
        columnGap: '10px',

        '&:hover': {
            backgroundColor: selected ? TransparentColor.GREEN : darken(TransparentColor.GREY, 0.5),
            cursor: 'pointer',
        }
    }),
    nestedItemWrapper: (selected: boolean) => ({
        padding: selected ? '10px 17px' : '10px 19px',
        borderRadius: '8px',
        color: selected ? Color.WHITE : Color.GREY,
        fontSize: '14px',
        fontWeight: selected ? 600 : 500,
        fontFamily: FontFamily.RALEWAY_REGULAR,

        display: 'flex',
        alignItems: 'center',
        columnGap: '14px',

        '&:hover': {
            backgroundColor: selected ? 'inherit' : darken(TransparentColor.GREY, 0.5),
            cursor: 'pointer',
        }
    }),
    nestedItemDot: (selected: boolean) => ({
        color: selected ? lighten(Color.LIGHT_GREEN, 0.3) : Color.GREY,
    }),
    toggleIcon: {
        marginLeft: 'auto',
    },
};

export const collapsedViewStyles = {
    itemWrapper: (selected: boolean) => ({
        padding: '10px',
        height: '60px',
        borderRadius: '8px',
        color: selected ? lighten(Color.LIGHT_GREEN, 0.3) : Color.GREY,
        fontSize: '12px',
        fontWeight: selected ? 600 : 500,
        fontFamily: FontFamily.RALEWAY_REGULAR,
        backgroundColor: selected ? TransparentColor.GREEN : 'inherit',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        rowGap: '5px',

        '&:hover': {
            backgroundColor: selected ? TransparentColor.GREEN : darken(TransparentColor.GREY, 0.5),
            color: selected ? lighten(Color.LIGHT_GREEN, 0.3) : darken(Color.WHITE, 0.2),
            cursor: 'pointer',
        },
    }),
    toggleIcon: {
        position: 'absolute',
        width: '16px',
        right: '4px',
    },
    nestedItemsWrapper: {
        padding: '6px',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '5px',
        minWidth: '150px',
        position: 'absolute',
        left: '70px',
        top: '14px',
        borderRadius: '8px',
        backdropFilter: 'blur(10px)',
        backgroundColor: Color.DARK_GREY,
    },
    nestedItemWrapper: (selected: boolean) => ({
        padding: '6px 10px',
        borderRadius: '8px',
        color: selected ? Color.WHITE : Color.GREY,
        fontSize: '14px',
        fontWeight: selected ? 600 : 500,
        fontFamily: FontFamily.RALEWAY_REGULAR,

        '&:hover': {
            backgroundColor: selected ? 'inherit' : darken(TransparentColor.GREY, 0.5),
            color: Color.WHITE,
            cursor: 'pointer',
        }
    }),
};
