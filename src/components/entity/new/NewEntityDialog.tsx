import {
    Box,
    Button,
    IconButton,
    Paper,
    Typography,
} from '@mui/material';
import { CloseRounded as CloseIcon } from '@mui/icons-material';

import styles from './NewEntityDialog.styles';

interface Props {
    title: string,
    fields: JSX.Element,

    onClose: () => void,
    onSubmit: (e: React.FormEvent<HTMLDivElement>) => void,
};

const NewEntityDialog = (props: Props) => {

    return (
        <Paper sx={styles.root} elevation={3}>
            <Box sx={styles.header.wrapper}>
                <Typography sx={styles.header.text}>
                    {props.title}
                </Typography>
                <IconButton sx={styles.header.closeIconWrapper} onClick={props.onClose}>
                    <CloseIcon fontSize='small' />
                </IconButton>
            </Box>
            <Box sx={styles.content.wrapper} component='form' onSubmit={props.onSubmit}>
                {props.fields}
                <Box sx={styles.actions.wrapper}>
                    <Button sx={styles.actions.cancelButton} onClick={props.onClose}>
                        Cancel
                    </Button>
                    <Button sx={styles.actions.confirmButton} type='submit'>
                        Create
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default NewEntityDialog;
