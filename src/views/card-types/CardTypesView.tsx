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
    FileUploadOutlined as UploadIcon,
} from '@mui/icons-material';
import { usePrevious } from '../../hooks';
import nextId from 'react-id-generator';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { changeCardType, getCardTypes } from '../../store/card-type/cardTypeSlice';
import { addFlashMessage } from '../../store/flash-message/flashMessageSlice';
import { CardTypeDto } from '../../store/card-type/types';
import { FlashMessageType } from '../../store/flash-message/types';
import CardTypeService from '../../services/CardTypeService';
import KeyboardKeys from '../../properties/KeyboardKeys';

import Loading from '../../components/loading/Loading';
import DeleteCardTypeAlert from './alert/DeleteCardTypeAlert';
import NewCardTypeDialog from './new/NewCardTypeDialog';

import styles from './CardTypesView.styles';

interface DeleteAlertOptions {
    open: boolean,
    id: number | null,
};

const CardTypesView = () => {

    const dispatch = useAppDispatch();
    const cardTypes = useAppSelector((state) => state.cardTypes.data);
    const loading = useAppSelector((state) => state.cardTypes.loading);
    const previousLoading = usePrevious(loading);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [deleteAlertOptions, setDeleteAlertOptions] = useState<DeleteAlertOptions>({
        open: false,
        id: null,
    });
    const [newDialogOpen, setNewDialogOpen] = useState(false);
    const [editing, setEditing] = useState<CardTypeDto>();
    
    const editingErrorsInitialState = {
        name: false,
        show: false,
    };
    const [editingErrors, setEditingErrors] = useState(editingErrorsInitialState);

    useEffect(() => {

        dispatch(getCardTypes());
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

    const handleEditIconClick = (row: CardTypeDto) => {

        setEditing(row);
    };

    const handleCloseIconClick = () => {

        setEditing(undefined);
        setEditingErrors(editingErrorsInitialState);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { value } = e.target;
        setEditing(previousState => ({
            ...previousState!,
            name: value,
        }));
        setEditingErrors(previousErrors => ({
            ...previousErrors,
            //@ts-ignore
            name: previousErrors.show ? !CardTypeService.isNameValid(value) : previousErrors.name,
        }));
    };

    const handleEditingKeyDown = (key: string, row: CardTypeDto) => {

        if (key === KeyboardKeys.ENTER) {
            handleEditingAccept(row);
        } else if (key === KeyboardKeys.ESCAPE) {
            handleCloseIconClick();
        }
    };

    const handleEditingAccept = (row: CardTypeDto) => {
        
        const nameValid = CardTypeService.isNameValid(editing?.name);
        if (!nameValid) {
            setEditingErrors({
                name: !nameValid,
                show: true,
            });
        } else if (editing?.name !== row.name || editing?.icon !== row.icon) {
            dispatch(changeCardType(editing!));
        } else {
            handleCloseIconClick();
        }
    };

    const toggleNewDialog = () => {

        setNewDialogOpen(!newDialogOpen);
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
                    setEditing(previousState => ({
                        ...previousState!,
                        icon: image.src.substring(image.src.indexOf('base64') + 'base64'.length + 1),
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
    }

    return (
        <Box sx={styles.root}>
            <Box sx={styles.header.wrapper}>
                <Typography sx={styles.header.title}>
                    Card Types
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
                                <TableCell sx={{...styles.table.head.content.cell, paddingLeft: '26px' }} width={150}>
                                    Icon
                                </TableCell>
                                <TableCell sx={{...styles.table.head.content.cell, paddingLeft: '40px' }} width={150}>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </Box>
                <Box sx={styles.table.body.wrapper}>
                    <Table>
                        <TableBody sx={styles.table.body.content.wrapper}>
                            {cardTypes.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map(row => (
                                <TableRow sx={styles.table.body.content.row} key={row.name}>
                                    <TableCell sx={styles.table.body.content.cell} width={200}>
                                        {editing?.id === row.id
                                            ? <TextField
                                                sx={styles.table.body.content.textField}
                                                autoFocus
                                                name='name'
                                                defaultValue={editing?.name}
                                                onChange={handleNameChange}
                                                onKeyDown={e => handleEditingKeyDown(e.key, row)}
                                                error={editingErrors.name}
                                                helperText={editingErrors.name && CardTypeService.messages.invalidName}
                                            />
                                            : row.name
                                        }
                                    </TableCell>
                                    <TableCell sx={styles.table.body.content.cell} width={150}>
                                        <Box sx={styles.table.body.content.pictureWrapper}>
                                            <Box
                                                component='img'
                                                src={`data:image/png;base64,${(editing?.id === row.id ? editing?.icon : row.icon)}`}
                                            />
                                        </Box>
                                        {editing?.id === row.id &&
                                            <IconButton
                                                component='label'
                                                sx={styles.table.body.content.iconWrapper}
                                            >
                                                <input hidden type='file' accept='image/*' onChange={handleIconUpload} />
                                                <UploadIcon />
                                            </IconButton>
                                        }
                                    </TableCell>
                                    <TableCell sx={styles.table.body.content.cell} width={150}>
                                        <IconButton
                                            sx={styles.table.body.content.iconWrapper}
                                            disabled={editing?.id === row.id && editingErrors.name}
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
                    count={cardTypes.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {deleteAlertOptions.open &&
                <DeleteCardTypeAlert
                    id={deleteAlertOptions.id!!}
                    onClose={handleDeleteAlertClose}
                />
            }
            {newDialogOpen &&
                <NewCardTypeDialog onClose={toggleNewDialog} />
            }
        </Box>
    );
};

export default CardTypesView;