import { darken, lighten } from '@mui/material';
import { Color, TransparentColor, FontFamily, FontWeight } from '../../../properties';

const styles = {
    
    expanded: {

        root: (selected: boolean) => ({
            padding: '10px',
            borderRadius: '8px',
            color: selected ? lighten(Color.LIGHT_GREEN, 0.3) : Color.GREY,
            fontSize: '14px',
            fontWeight: selected ? FontWeight.SEMI_BOLD : FontWeight.MEDIUM,
            fontFamily: FontFamily.RALEWAY,
            backgroundColor: selected ? TransparentColor.GREEN : 'inherit',
    
            display: 'flex',
            alignItems: 'center',
            columnGap: '10px',
    
            '&:hover': {
                backgroundColor: selected ? TransparentColor.GREEN : darken(TransparentColor.GREY, 0.5),
                cursor: 'pointer',
            },
        }),

        toggleIcon: {
            marginLeft: 'auto',
        },

        nested: {

            wrapper: (selected: boolean) => ({
                padding: selected ? '10px 17px' : '10px 19px',
                borderRadius: '8px',
                color: selected ? Color.WHITE : Color.GREY,
                fontSize: '14px',
                fontWeight: selected ? FontWeight.SEMI_BOLD : FontWeight.MEDIUM,
                fontFamily: FontFamily.RALEWAY,
        
                display: 'flex',
                alignItems: 'center',
                columnGap: '14px',
        
                '&:hover': {
                    backgroundColor: selected ? 'inherit' : darken(TransparentColor.GREY, 0.5),
                    cursor: 'pointer',
                },
            }),

            dot: (selected: boolean) => ({
                color: selected ? lighten(Color.LIGHT_GREEN, 0.3) : Color.GREY,
            }),
        },
    },

    collapsed: {

        root: (selected: boolean) => ({
            padding: '10px',
            height: '60px',
            borderRadius: '8px',
            color: selected ? lighten(Color.LIGHT_GREEN, 0.3) : Color.GREY,
            fontSize: '12px',
            fontWeight: selected ? FontWeight.SEMI_BOLD : FontWeight.MEDIUM,
            fontFamily: FontFamily.RALEWAY,
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

        nested: {

            wrapper: {
                padding: '6px',
                display: 'flex',
                flexDirection: 'column',
                rowGap: '5px',
                minWidth: '150px',
                position: 'fixed',
                left: '81px',
                borderRadius: '8px',
                backdropFilter: 'blur(10px)',
                backgroundColor: Color.DARK_GREY,
            },

            element: (selected: boolean) => ({
                padding: '6px 10px',
                borderRadius: '8px',
                color: selected ? Color.WHITE : Color.GREY,
                fontSize: '14px',
                fontWeight: selected ? FontWeight.SEMI_BOLD : FontWeight.MEDIUM,
                fontFamily: FontFamily.RALEWAY,
        
                '&:hover': {
                    backgroundColor: selected ? 'inherit' : darken(TransparentColor.GREY, 0.5),
                    color: Color.WHITE,
                    cursor: 'pointer',
                },
            }),
        },
    },
};

export default styles;
