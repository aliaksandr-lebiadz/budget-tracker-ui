import { useState } from 'react';
import {
    CheckCircleRounded as SuccessIcon,
    ErrorRounded as ErrorIcon,
    InfoRounded as InfoIcon,
    CloseSharp as CloseIcon,
} from '@mui/icons-material';

import FlashMessageComponents from '../../components/flash-message';
import Colors from '../../properties/Color';
import { FlashMessageDto, FlashMessageType } from '../../store/flash-message/types';
import { useAppDispatch } from '../../store/store';
import { deleteFlashMessageById } from '../../store/flash-message/flashMessageSlice';

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
            case FlashMessageType.SUCCESS: return <SuccessIcon htmlColor={Colors.LIGHT_GREEN} />;
            case FlashMessageType.INFO: return <InfoIcon htmlColor={Colors.LIGHT_BLUE} />;
            case FlashMessageType.ERROR: return <ErrorIcon htmlColor={Colors.LIGHT_RED} />;
        }
    };

    return (
        <FlashMessageComponents.Message.Wrapper elevation={5}>
            <FlashMessageComponents.Message.Line type={type} />
            <FlashMessageComponents.Message.StatusIconWrapper>
                {getStatusIcon(type)}
            </FlashMessageComponents.Message.StatusIconWrapper>
            <FlashMessageComponents.Message.Text.Wrapper expanded={expanded}>
                <FlashMessageComponents.Message.Text.Title>
                    {type}
                </FlashMessageComponents.Message.Text.Title>
                <FlashMessageComponents.Message.Text.Content onClick={handleTextClick}>
                    {message}
                </FlashMessageComponents.Message.Text.Content>
            </FlashMessageComponents.Message.Text.Wrapper>
            <FlashMessageComponents.Message.CloseIconWrapper>
                <CloseIcon
                    htmlColor={Colors.GREY}
                    fontSize='small'
                    onClick={handleClose}
                />
            </FlashMessageComponents.Message.CloseIconWrapper>
        </FlashMessageComponents.Message.Wrapper>
    );
};

export default FlashMessage;
