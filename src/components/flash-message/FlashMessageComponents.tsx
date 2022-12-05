import { Paper, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

import Color from '../../properties/Color';
import FontFamily from '../../properties/FontFamily';
import { FlashMessageType } from '../../store/flash-message/types';

export const FlashMessagesWrapper = styled(Box)({
    minWidth: 350,
    position: 'absolute',
    left: 20,
    bottom: 0,
    zIndex: 1000,
});

export const FlashMessageWrapper = styled(Paper)({
    height: 55,
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
});

export const FlashMessageLine = styled(Box, {
    shouldForwardProp: (props) => props !== 'type',
})(({ type }: { type: FlashMessageType }) => ({
    height: '100%',
    width: 5,
    backgroundColor: type === FlashMessageType.SUCCESS ? Color.LIGHT_GREEN : FlashMessageType.INFO ? Color.LIGHT_BLUE : Color.LIGHT_RED,
    borderBottomLeftRadius: 'inherit',
    borderTopLeftRadius: 'inherit',
    alignSelf: 'stretch',
}));

export const FlashMessageStatusIconBox = styled(Box)({
    width: 30,
    display: 'flex',
    justifyContent: 'center',
    margin: '0 7px',
});

export const FlashMessageTextBox = styled(Box, {
    shouldForwardProp: (props) => props !== 'expanded',
})(({ expanded }: { expanded: boolean }) => ({
    minWidth: 300,
    width: expanded ? 'auto': 300,
    userSelect: 'none',
}));

export const FlashMessageTextTitle = styled(Typography)({
    fontFamily: FontFamily.RALEWAY_SEMI_BOLD,
    textTransform: 'capitalize',
    lineHeight: 1.2,
});

export const FlashMessageTextContent = styled(Typography)({
    fontFamily: FontFamily.RALEWAY_REGULAR,
    lineHeight: 1.2,
    fontSize: 14,
    color: Color.GREY,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    cursor: 'pointer',
});

export const FlashMessageCloseIconBox = styled(Box)({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
    margin: '0 7px',
});
