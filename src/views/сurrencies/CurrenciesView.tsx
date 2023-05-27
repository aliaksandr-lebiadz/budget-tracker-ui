import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import {
    DeleteRounded as DeleteIcon,
    EditRounded as EditIcon,
    AddRounded as AddIcon,
    CloseRounded as CloseIcon,
    CheckRounded as AcceptIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { changeCurrency, getCurrencies } from '../../store/currency/currencySlice';
import { CurrencyService } from '../../services';
import KeyboardKeys from '../../properties/KeyboardKeys';
import { CurrencyDto } from '../../store/currency/types';

import Loading from '../../components/loading/Loading';
import DeleteCurrencyAlert from './delete/DeleteCurrencyAlert';
import NewCurrencyDialog from './new/NewCurrencyDialog';

import styles from './CurrenciesView.styles';
import { usePrevious } from '../../hooks';

interface DeleteAlertOptions {
    open: boolean,
    id: number | null,
};

const CurrenciesView = () => {

    const dispatch = useAppDispatch();
    const currencies = useAppSelector((state) => state.currencies.data);
    const loading = useAppSelector((state) => state.currencies.loading);
    const previousLoading = usePrevious(loading);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [deleteAlertOptions, setDeleteAlertOptions] = useState<DeleteAlertOptions>({
        open: false,
        id: null,
    });
    const [newDialogOpen, setNewDialogOpen] = useState(false);
    const [editing, setEditing] = useState<CurrencyDto>();
    
    const editingErrorsInitialState = {
        name: false,
        code: false,
        show: false,
    };
    const [editingErrors, setEditingErrors] = useState(editingErrorsInitialState);

    useEffect(() => {

        dispatch(getCurrencies());
    }, [dispatch]);

    useEffect(() => {

        if (previousLoading.add && !loading.add) {
            toggleNewDialog();
        } else if (previousLoading.change && !loading.change) {
            handleCloseIconClick();
        } else if (previousLoading.delete && !loading.delete) {
            handleDeleteAlertClose();
        }
    }, [loading, previousLoading])

    const handleChangePage = (event: any, newPage: number) => {

        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {

        setRowsPerPage(Number(event.target.value));
        setPage(0);
    };

    const handleDeleteIconClick = (id: number) => {

        setDeleteAlertOptions({
            open: true,
            id: id,
        });
    };

    const handleDeleteAlertClose = () => {

        setDeleteAlertOptions({
            open: false,
            id: null,
        });
    }

    const handleEditIconClick = (row: CurrencyDto) => {

        setEditing(row);
    };

    const handleCloseIconClick = () => {

        setEditing(undefined);
        setEditingErrors(editingErrorsInitialState);
    };

    const handleEditingChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;
        setEditing(previousState => ({
            ...previousState!,
            [name]: value,
        }));
        setEditingErrors(previousErrors => ({
            ...previousErrors,
            //@ts-ignore
            [name]: previousErrors.show ? !CurrencyService.isValid(name, value) : previousErrors[name],
        }));
    };

    const handleEditingKeyDown = (key: string, row: CurrencyDto) => {

        if (key === KeyboardKeys.ENTER) {
            handleEditingAccept(row);
        } else if (key === KeyboardKeys.ESCAPE) {
            handleCloseIconClick();
        }
    };

    const handleEditingAccept = (row: CurrencyDto) => {
        
        const nameValid = CurrencyService.isNameValid(editing?.name);
        const codeValid = CurrencyService.isCodeValid(editing?.code);
        if (!nameValid || !codeValid) {
            setEditingErrors({
                name: !nameValid,
                code: !codeValid,
                show: true,
            });
        } else if (editing?.name !== row.name || editing?.code !== row.code) {
            dispatch(changeCurrency(editing!));
        } else {
            handleCloseIconClick();
        }
    };

    const toggleNewDialog = () => {

        setNewDialogOpen(!newDialogOpen);
    };

    return (
        <Box sx={styles.root}>
            <Box sx={styles.header.wrapper}>
                <Typography sx={styles.header.title}>
                    Currencies
                </Typography>
                {loading.get && <Loading />}
                <Button sx={styles.header.button.wrapper} variant='contained' onClick={toggleNewDialog}>
                    <Typography sx={styles.header.button.text}>
                        Add
                    </Typography>
                    <Box sx={styles.header.button.iconWrapper}>
                        <AddIcon />
                    </Box>
                </Button>
            </Box>
            <Paper sx={styles.table.wrapper} elevation={3}>
                <Box>
                    <Table>
                        <TableHead sx={styles.table.head.content.wrapper}>
                            <TableRow>
                                <TableCell sx={styles.table.head.content.cell} width={200}>
                                    Name
                                </TableCell>
                                <TableCell sx={styles.table.head.content.cell} width={150}>
                                    Code
                                </TableCell>
                                <TableCell sx={styles.table.head.content.cell} width={150} align='center'>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </Box>
                <Box sx={styles.table.body.wrapper}>
                    <Table>
                        <TableBody sx={styles.table.body.content.wrapper}>
                            {currencies.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map(row => (
                                <TableRow key={row.name}>
                                    <TableCell sx={styles.table.body.content.cell} width={200}>
                                        {editing?.id === row.id
                                            ? <TextField
                                                sx={styles.table.body.content.textField}
                                                autoFocus
                                                name='name'
                                                defaultValue={editing?.name}
                                                onChange={handleEditingChange}
                                                onKeyDown={e => handleEditingKeyDown(e.key, row)}
                                                error={editingErrors.name}
                                                helperText={editingErrors.name && CurrencyService.messages.invalidName}
                                            />
                                            : row.name
                                        }
                                    </TableCell>
                                    <TableCell sx={styles.table.body.content.cell} width={150}>
                                        {editing?.id === row.id
                                            ? <TextField
                                                sx={styles.table.body.content.textField}
                                                name='code'
                                                defaultValue={editing?.code}
                                                onChange={handleEditingChange}
                                                onKeyDown={e => handleEditingKeyDown(e.key, row)}
                                                error={editingErrors.code}
                                                helperText={editingErrors.code && CurrencyService.messages.invalidCode}
                                            />
                                            : row.code
                                        }
                                    </TableCell>
                                    <TableCell sx={styles.table.body.content.cell} width={150}>
                                        <IconButton
                                            sx={styles.table.body.content.iconWrapper}
                                            disabled={editing?.id === row.id && (editingErrors.name || editingErrors.code)}
                                            onClick={editing?.id === row.id
                                                ? () => handleEditingAccept(row)
                                                : () => handleEditIconClick(row)
                                            }
                                        >
                                            {editing?.id === row.id ? <AcceptIcon /> : <EditIcon />}
                                        </IconButton>
                                        <IconButton
                                            sx={styles.table.body.content.iconWrapper}
                                            onClick={editing?.id === row.id
                                                ? () => handleCloseIconClick()
                                                : () => handleDeleteIconClick(row.id)
                                            }
                                        >
                                            {editing?.id === row.id ? <CloseIcon /> : <DeleteIcon/>}
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
                <TablePagination
                    sx={styles.table.pagination}
                    rowsPerPageOptions={[5, 10]}
                    count={currencies.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {deleteAlertOptions.open &&
                <DeleteCurrencyAlert
                    id={deleteAlertOptions.id!!}
                    onClose={handleDeleteAlertClose}
                />
            }
            {newDialogOpen &&
                <NewCurrencyDialog onClose={toggleNewDialog} />
            }
        </Box>
    );
};

export default CurrenciesView;