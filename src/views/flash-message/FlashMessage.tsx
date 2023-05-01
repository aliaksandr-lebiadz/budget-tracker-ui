import { useState } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import {
    CheckCircleRounded as SuccessIcon,
    ErrorRounded as ErrorIcon,
    InfoRounded as InfoIcon,
    CloseSharp as CloseIcon,
} from '@mui/icons-material';

import { useAppDispatch } from '../../store/store';
import { deleteFlashMessageById } from '../../store/flash-message/flashMessageSlice';
import { FlashMessageDto, FlashMessageType } from '../../store/flash-message/types';
import { Color } from '../../properties/Color';

import styles from './FlashMessageStyles';

const FlashMessage = ({ id, type, message }: FlashMessageDto) => {

    const dispatch = useAppDispatch();
    const [expanded, setExpanded] = useState(false);

    const handleTextClick = () => {
        
        setExpanded((previousExpanded: boolean) => !previousExpanded);
    };

    const handleClose = () => {

        dispatch(deleteFlashMessageById(id));
    };

    const getStatusIcon = (type: FlashMessageType): JSX.Element => {
        switch(type) {
            case FlashMessageType.SUCCESS: return <SuccessIcon htmlColor={Color.LIGHT_GREEN} />;
            case FlashMessageType.INFO: return <InfoIcon htmlColor={Color.LIGHT_BLUE} />;
            case FlashMessageType.ERROR: return <ErrorIcon htmlColor={Color.LIGHT_RED} />;
        }
    };

    return (
        <Paper sx={styles.wrapper} elevation={5}>
            <Box sx={styles.line(type)} />
            <Box sx={styles.statusIconWrapper}>
                {getStatusIcon(type)}
            </Box>
            <Box sx={styles.textWrapper(expanded)}>
                <Typography sx={styles.textTitle}>
                    {type}
                </Typography>
                <Typography sx={styles.textContent} onClick={handleTextClick}>
                    {message}
                </Typography>
            </Box>
            <Box sx={styles.closeIconWrapper}>
                <CloseIcon
                    htmlColor={Color.GREY}
                    fontSize='small'
                    onClick={handleClose}
                />
            </Box>
        </Paper>
    );
};

export default FlashMessage;
