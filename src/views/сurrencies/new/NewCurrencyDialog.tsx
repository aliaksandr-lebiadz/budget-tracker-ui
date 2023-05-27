import { useState } from 'react';
import {
    Box,
    Button,
    IconButton,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { CloseRounded as CloseIcon } from '@mui/icons-material';
import { useAppDispatch } from '../../../store/store';
import { CurrencyService } from '../../../services';
import { addCurrency } from '../../../store/currency/currencySlice';

import styles from './NewCurrencyDialog.styles';

interface Props {
    onClose: () => void,
};

interface FieldsState {
    name?: string,
    code?: string,
};

interface ErrorsState {
    name: boolean,
    code: boolean,
    show: boolean,
};

const NewCurrencyDialog = (props: Props) => {

    const dispatch = useAppDispatch();

    const [fields, setFields] = useState<FieldsState>({});
    
    const errorsInitialState = {
        name: false,
        code: false,
        show: false,
    };
    const [errors, setErrors] = useState<ErrorsState>(errorsInitialState);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;
        setFields(previousFields => ({
            ...previousFields,
            [name]: value,
        }));
        setErrors(previousErrors => ({
            ...previousErrors,
            //@ts-ignore
            [name]: previousErrors.show ? !CurrencyService.isValid(name, value) : previousErrors[name],
        }));
    };

    const handleSubmit: React.FormEventHandler<HTMLDivElement> = (e: React.FormEvent<HTMLDivElement>) => {
        
        e.preventDefault();

        const nameValid = CurrencyService.isNameValid(fields.name);
        const codeValid = CurrencyService.isCodeValid(fields.code);
        if (!nameValid || !codeValid) {
            setErrors({
                name: !nameValid,
                code: !codeValid,
                show: true,
            });
        } else {
            dispatch(addCurrency({
                name: fields.name!,
                code: fields.code!,
            }));
        }
    };

    return (
        <Paper sx={styles.root} elevation={3}>
            <Box sx={styles.header.wrapper}>
                <Typography sx={styles.header.text}>
                    New Currency
                </Typography>
                <IconButton sx={styles.header.closeIconWrapper} onClick={props.onClose}>
                    <CloseIcon fontSize='small' />
                </IconButton>
            </Box>
            <Box sx={styles.content.wrapper} component='form' onSubmit={handleSubmit}>
                <Box sx={styles.content.textField.wrapper}>
                    <Typography sx={styles.content.textField.label}>Name: </Typography>
                    <TextField
                        sx={styles.content.textField.input}
                        autoFocus
                        name='name'
                        onChange={handleInputChange}
                        error={errors.name}
                        helperText={errors.name && CurrencyService.messages.invalidName}
                    />
                </Box>
                <Box sx={styles.content.textField.wrapper}>
                    <Typography sx={styles.content.textField.label}>Code: </Typography>
                    <TextField
                        sx={styles.content.textField.input}
                        name='code'
                        onChange={handleInputChange}
                        error={errors.code}
                        helperText={errors.code && CurrencyService.messages.invalidCode}
                    />
                </Box>
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

export default NewCurrencyDialog;