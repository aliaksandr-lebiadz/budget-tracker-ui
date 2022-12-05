import { FormControlLabel, Checkbox } from '@mui/material';
import { styled } from '@mui/system';

import Color from '../../properties/Color';
import FontFamily from '../../properties/FontFamily';

export const RememberMeControl = styled(FormControlLabel)({
    '.MuiTypography-root': {
        fontFamily: FontFamily.RALEWAY_REGULAR,
        color: Color.GREY,
        fontSize: 14,
    },
});

export const RememberMeCheckbox = styled(Checkbox)({
    color: Color.DARK_PINK,
    marginLeft: 3,
    marginRight: -3,

    '&.Mui-checked': {
        color: Color.DARK_PINK,
    },
});
