import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

import styles from './Alert.styles';

interface Props {
    title: string,
    content: JSX.Element,
    closeButtonTitle: string,
    confirmButtonTitle: string,
    onClose: () => void,
    onConfirm: () => void,
};

const Alert = (props: Props) => {

    const handleConfirm = () => {
        props.onConfirm();
        props.onClose();
    };

    return (
        <Dialog
            open
            onClose={props.onClose}
            PaperProps={{
                sx: styles.paper,
            }}
        >
            <DialogTitle sx={styles.title}>
                {props.title}
            </DialogTitle>
            <DialogContent sx={styles.content.wrapper}>
                <DialogContentText sx={styles.content.text}>
                    {props.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    sx={styles.actions.closeButton}
                    variant='text'
                    onClick={props.onClose}
                >
                    {props.closeButtonTitle}
                </Button>
                <Button
                    sx={styles.actions.confirmButton}
                    variant='outlined'
                    onClick={handleConfirm}
                >
                    {props.confirmButtonTitle}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Alert;