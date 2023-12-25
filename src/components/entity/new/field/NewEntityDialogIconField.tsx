import {
    Box,
    Typography,
    Button,
} from '@mui/material';
import { FileUploadOutlined as UploadIcon } from '@mui/icons-material';
import nextId from 'react-id-generator';
import { useAppDispatch } from '../../../../store/store';
import { addFlashMessage } from '../../../../store/flash-message/flashMessageSlice';
import { FlashMessageType } from '../../../../store/flash-message/types';

import styles from './NewEntityDialogField.styles';

interface Props {
    label: string,
    value?: string,
    error: boolean,
    errorMessage: string,

    isValid: (width: number, height: number) => boolean,
    onChange: (value: string) => void,
};

const NewEntityDialogIconField = (props: Props) => {

    const dispatch = useAppDispatch();

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
                if (props.isValid(image.width, image.height)) {
                    const value = image.src.substring(image.src.indexOf('base64') + 'base64'.length + 1);
                    props.onChange(value);
                } else {
                    dispatch(addFlashMessage({
                        id: nextId(),
                        type: FlashMessageType.ERROR,
                        message: props.errorMessage,
                    }));
                }
            }
        }
    };

    return (
        <Box sx={styles.root}>
            <Typography sx={styles.label}>{props.label}:</Typography>
            <Box sx={styles.upload.wrapper}>
                <Box sx={styles.upload.pictureWrapper(props.value !== undefined, props.error)}>
                    {props.value && 
                        <Box
                            component='img'
                            src={`data:image/png;base64,${props.value}`}
                        />
                    } 
                </Box>
                <Button component='label' sx={styles.upload.button}>
                    <input hidden type='file' accept='image/*' onChange={handleIconUpload} />
                    <Typography sx={styles.upload.text}>Upload</Typography>
                    <UploadIcon />
                </Button>
            </Box>
        </Box>
    );
};

export default NewEntityDialogIconField;
