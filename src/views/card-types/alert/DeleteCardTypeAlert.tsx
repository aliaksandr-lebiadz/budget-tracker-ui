import { Typography } from '@mui/material';
import { useAppDispatch } from '../../../store/store';
import { deleteCardTypeById } from '../../../store/card-type/cardTypeSlice';

import DeleteEntityAlert from '../../../components/entity/alert/DeleteEntityAlert';

import styles from './DeleteCardTypeAlert.styles';

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
        <DeleteEntityAlert
            content={
                <Typography sx={styles.text}>
                    Following accounts will be deleted, because they are using this card type:
                </Typography>
            }
            onClose={props.onClose}
            onConfirm={handleConfirm}
        />
    );
};

export default DeleteCardTypeAlert;
