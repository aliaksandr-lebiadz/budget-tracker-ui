import {
    TableCell,
    IconButton,
} from '@mui/material';
import {
    DeleteRounded as DeleteIcon,
    EditRounded as EditIcon,
    CloseRounded as CloseIcon,
    CheckRounded as AcceptIcon,
} from '@mui/icons-material';

import styles from './EntityTableCell.styles';

interface EditingProps {
    error: boolean,
    
    onAcceptClick: () => void,
    onCloseClick: () => void,
};

interface RegularProps {
    onEditClick: () => void,
    onDeleteClick: () => void,
};

interface Props {
    editing: boolean,
    editingProps: EditingProps,
    regularProps: RegularProps,
};

const EntityTableActionsCell = ({ editing, editingProps, regularProps }: Props) => {

    return (
        <TableCell sx={styles.root} width={150}>
            <IconButton
                sx={styles.iconWrapper}
                disabled={editing && editingProps.error}
                onClick={editing
                    ? () => editingProps.onAcceptClick()
                    : () => regularProps.onEditClick()
                }
            >
                {editing ? <AcceptIcon /> : <EditIcon />}
            </IconButton>
            <IconButton
                sx={styles.iconWrapper}
                onClick={editing
                    ? () => editingProps.onCloseClick()
                    : () => regularProps.onDeleteClick()
                }
            >
                {editing ? <CloseIcon /> : <DeleteIcon/>}
            </IconButton>
        </TableCell>
    );
};

export default EntityTableActionsCell;
