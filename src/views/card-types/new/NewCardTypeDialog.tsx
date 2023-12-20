import { useState } from 'react';
import {
    Box,
    Button,
    IconButton,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { CloseRounded as CloseIcon, FileUploadOutlined as UploadIcon } from '@mui/icons-material';
import nextId from 'react-id-generator';
import { useAppDispatch } from '../../../store/store';
import { addCardType } from '../../../store/card-type/cardTypeSlice';
import { addFlashMessage } from '../../../store/flash-message/flashMessageSlice';
import { FlashMessageType } from '../../../store/flash-message/types';
import CardTypeService from '../../../services/CardTypeService';

import styles from './NewCardTypeDialog.styles';

interface Props {
    onClose: () => void,
};

interface FieldsState {
    name?: string,
    icon?: string,
};

interface ErrorsState {
    name: boolean,
    icon: boolean,
    show: boolean,
};

const NewCardTypeDialog = (props: Props) => {

    const dispatch = useAppDispatch();

    const [fields, setFields] = useState<FieldsState>({});
    
    const errorsInitialState = {
        name: false,
        icon: false,
        show: false,
    };
    const [errors, setErrors] = useState<ErrorsState>(errorsInitialState);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { value } = e.target;
        setFields(previousFields => ({
            ...previousFields,
            name: value,
        }));
        setErrors(previousErrors => ({
            ...previousErrors,
            name: previousErrors.show ? !CardTypeService.isNameValid(value) : previousErrors.name,
        }));
    };

    const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {

        const image = new Image();
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                image.src = reader.result?.toString()!!;
            };

            image.onload = () => {
                if (CardTypeService.isIconValid(image.width, image.height)) {
                    setFields(previousState => ({
                        ...previousState!,
                        icon: image.src.substring(image.src.indexOf('base64') + 'base64'.length + 1),
                    }));
                    setErrors(previousErrors => ({
                        ...previousErrors,
                        icon: false,
                    }));
                } else {
                    dispatch(addFlashMessage({
                        id: nextId(),
                        type: FlashMessageType.ERROR,
                        message: CardTypeService.messages.invalidIcon,
                    }));
                }
            }
        }
    };

    const handleSubmit: React.FormEventHandler<HTMLDivElement> = (e: React.FormEvent<HTMLDivElement>) => {
        
        e.preventDefault();

        const nameValid = CardTypeService.isNameValid(fields.name);
        const iconValid = fields.icon !== undefined;
        if (!nameValid || !iconValid) {
            setErrors({
                name: !nameValid,
                icon: !iconValid,
                show: true,
            });
        } else {
            dispatch(addCardType({
                name: fields.name!,
                icon: fields.icon!,
            }));
        }
    };

    return (
        <Paper sx={styles.root} elevation={3}>
            <Box sx={styles.header.wrapper}>
                <Typography sx={styles.header.text}>
                    New card type
                </Typography>
                <IconButton sx={styles.header.closeIconWrapper} onClick={props.onClose}>
                    <CloseIcon fontSize='small' />
                </IconButton>
            </Box>
            <Box sx={styles.content.wrapper} component='form' onSubmit={handleSubmit}>
                <Box sx={styles.content.textField.wrapper}>
                    <Typography sx={styles.content.textField.label}>Name:</Typography>
                    <TextField
                        sx={styles.content.textField.input}
                        autoFocus
                        name='name'
                        onChange={handleNameChange}
                        error={errors.name}
                        helperText={errors.name && CardTypeService.messages.invalidName}
                    />
                </Box>
                <Box sx={styles.content.textField.wrapper}>
                    <Typography sx={styles.content.textField.label}>Icon:</Typography>
                    <Box sx={styles.content.upload.wrapper}>
                        <Box sx={styles.content.upload.pictureWrapper(fields.icon !== undefined, errors.icon)}>
                            {fields.icon && 
                                <Box
                                    component='img'
                                    src={`data:image/png;base64,${fields.icon}`}
                                />
                            } 
                        </Box>
                        <Button component='label' sx={styles.content.upload.button}>
                            <input hidden type='file' accept='image/*' onChange={handleIconUpload} />
                            <Typography sx={styles.content.upload.text}>Upload</Typography>
                            <UploadIcon />
                        </Button>
                    </Box>
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

export default NewCardTypeDialog;
