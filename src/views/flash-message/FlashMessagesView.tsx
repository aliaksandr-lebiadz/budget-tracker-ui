import { Box } from '@mui/material';
import { useAppSelector } from '../../store/store';
import FlashMessage from './FlashMessage';

import styles from './FlashMessageView.styles';

const FlashMessagesView = () => {
    
    const flashMessages = useAppSelector((state) => state.flashMessages);

    return (
        <Box sx={styles.root}>
            {flashMessages.map(flashMessage => (
                <FlashMessage key={flashMessage.id} {...flashMessage} />
            ))}
        </Box>
    );
};

export default FlashMessagesView;