import { Typography } from '@mui/material';
import { useAppDispatch } from '../../../store/store';

import Alert from '../../../components/alert/Alert';

import styles from './DeleteCardTypeAlert.styles';
import { deleteCardTypeById } from '../../../store/card-type/cardTypeSlice';

interface Props {
    id: number,
    onClose: () => void
};

const DeleteCardTypeAlert = (props: Props) => {

    const dispatch = useAppDispatch();

    const handleConfirm = () => {
        
        dispatch(deleteCardTypeById(props.id));
    };

    return (
        <Alert
            title='Are you sure?'
            content={
                <Typography sx={styles.text}>
                    Following accounts will be deleted, because they are using this card type:
                </Typography>
            }
            closeButtonTitle='Close'
            confirmButtonTitle='Delete'
            onClose={props.onClose}
            onConfirm={handleConfirm}
        />
    );
};

export default DeleteCardTypeAlert;
