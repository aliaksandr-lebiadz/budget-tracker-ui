import {
    TableCell,
    Box,
    IconButton,
} from '@mui/material';
import { FileUploadOutlined as UploadIcon } from '@mui/icons-material';
import nextId from 'react-id-generator';
import { useAppDispatch } from '../../../../store/store';
import { addFlashMessage } from '../../../../store/flash-message/flashMessageSlice';
import { FlashMessageType } from '../../../../store/flash-message/types';

import styles from './EntityTableCell.styles';

interface EditingProps {
    defaultValue?: string,
    errorMessage: string,
    
    isValid: (width: number, height: number) => boolean,
    onChange: (value: string) => void,
};

interface RegularProps {
    value: string,
};

interface Props {
    width: number,
    editing: boolean,
    editingProps: EditingProps,
    regularProps: RegularProps,
};

const EntityTableIconCell = ({ width, editing, editingProps, regularProps }: Props) => {

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
                if (editingProps.isValid(image.width, image.height)) {
                    const value = image.src.substring(image.src.indexOf('base64') + 'base64'.length + 1);
                    editingProps.onChange(value);
                } else {
                    dispatch(addFlashMessage({
                        id: nextId(),
                        type: FlashMessageType.ERROR,
                        message: editingProps.errorMessage,
                    }));
                }
            }
        }
    };

    return (
        <TableCell sx={styles.root} width={width}>
            <Box sx={styles.pictureWrapper}>
                <Box
                    component='img'
                    src={`data:image/png;base64,${(editing ? editingProps.defaultValue : regularProps.value)}`}
                />
            </Box>
            {editing &&
                <IconButton
                    component='label'
                    sx={styles.iconWrapper}
                >
                    <input hidden type='file' accept='image/*' onChange={handleIconUpload} />
                    <UploadIcon />
                </IconButton>
            }
        </TableCell>
    );
};

export default EntityTableIconCell;
