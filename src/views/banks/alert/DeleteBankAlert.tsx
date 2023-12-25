import { Typography } from '@mui/material';
import { useAppDispatch } from '../../../store/store';
import { deleteBankById } from '../../../store/bank/bankSlice';

import DeleteEntityAlert from '../../../components/entity/alert/DeleteEntityAlert';

import styles from './DeleteBankAlert.styles';

interface Props {
    id: number,

    onClose: () => void
};

const DeleteBankAlert = (props: Props) => {

    const dispatch = useAppDispatch();

    const handleConfirm = () => {
        
        dispatch(deleteBankById(props.id));
    };

    return (
        <DeleteEntityAlert
            content={
                <Typography sx={styles.text}>
                    Following accounts will be deleted, because they are using this bank:
                </Typography>
            }
            onClose={props.onClose}
            onConfirm={handleConfirm}
        />
    );
};

export default DeleteBankAlert;
