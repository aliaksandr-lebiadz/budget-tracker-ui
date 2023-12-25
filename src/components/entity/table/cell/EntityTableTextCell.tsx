import {
    TableCell,
    TextField,
} from '@mui/material';
import { KeyboardKeys } from '../../../../properties';

import styles from './EntityTableCell.styles';

interface EditingProps {
    name: string,
    autoFocus?: boolean,
    defaultValue?: string,
    error: boolean,
    errorMessage: string,

    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onEnterKeyDown: () => void,
    onEscapeKeyDown: () => void,
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

const EntityTableTextCell = ({ width, editing, editingProps, regularProps }: Props) => {

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

        const { key } = e;
        if (key === KeyboardKeys.ENTER) {
            editingProps.onEnterKeyDown();
        } else if (key === KeyboardKeys.ESCAPE) {
            editingProps.onEscapeKeyDown();
        }
    };

    return (
        <TableCell sx={styles.root} width={width}>
            {editing
                ? <TextField
                    sx={styles.textField}
                    autoFocus={editingProps.autoFocus}
                    name={editingProps.name}
                    defaultValue={editingProps.defaultValue}
                    onChange={editingProps.onChange}
                    onKeyDown={handleKeyDown}
                    error={editingProps.error}
                    helperText={editingProps.error && editingProps.errorMessage}
                />
                : regularProps.value
            }
        </TableCell>
    );
};

export default EntityTableTextCell;
