import {
    Box,
    Typography,
    TextField,
} from '@mui/material';

import styles from './NewEntityDialogField.styles';

interface Props {
    label: string,
    name: string,
    autoFocus?: boolean,
    error: boolean,
    errorMessage: string,

    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
};

const NewEntityDialogTextField = (props: Props) => {

    return (
        <Box sx={styles.root}>
            <Typography sx={styles.label}>{props.label}:</Typography>
            <TextField
                sx={styles.textField}
                autoFocus={props.autoFocus}
                name={props.name}
                onChange={props.onChange}
                error={props.error}
                helperText={props.error && props.errorMessage}
            />
        </Box>
    );
};

export default NewEntityDialogTextField;
