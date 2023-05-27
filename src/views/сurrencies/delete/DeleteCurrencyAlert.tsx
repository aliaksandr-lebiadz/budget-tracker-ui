import { Typography } from '@mui/material';
import { useAppDispatch } from '../../../store/store';
import { deleteCurrencyById } from '../../../store/currency/currencySlice';

import Alert from '../../../components/alert/Alert';

import styles from './DeleteCurrencyAlert.styles';

interface Props {
    id: number,
    onClose: () => void
};

const DeleteCurrencyAlert = (props: Props) => {

    const dispatch = useAppDispatch();

    const handleConfirm = () => {
        
        dispatch(deleteCurrencyById(props.id));
    };

    return (
        <Alert
            title='Are you sure?'
            content={
                <Typography sx={styles.text}>
                    Following accounts will be deleted, because they are using this currency:
                </Typography>
            }
            closeButtonTitle='Close'
            confirmButtonTitle='Delete'
            onClose={props.onClose}
            onConfirm={handleConfirm}
        />
    );
};

export default DeleteCurrencyAlert;