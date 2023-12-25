import { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    SxProps,
} from '@mui/material';
import { Theme } from '@emotion/react';
import { AddRounded as AddIcon } from '@mui/icons-material';
import { HasId } from '../../../types/common';

import Loading from '../../loading/Loading';

import styles from './EntityTable.styles';

interface EntityColumnHeaderProps {
    title: string,
    width: number,
    styles?: SxProps<Theme>,
};

interface Props<T extends HasId> {
    title: string,
    loading: boolean,
    data: Array<T>,
    headerColumns: Array<EntityColumnHeaderProps>,

    generateBodyRow: (row: T) => JSX.Element,
    onAddButtonClick: () => void,
};

const EntityTable = <T extends HasId>(props: Props<T>) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event: any, newPage: number) => {

        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {

        setRowsPerPage(Number(event.target.value));
        setPage(0);
    };

    return (
        <Box sx={styles.root}>
            <Box sx={styles.header.wrapper}>
                <Typography sx={styles.header.title}>
                    {props.title}
                </Typography>
                {props.loading && <Loading />}
                <Button sx={styles.header.button.wrapper} variant='contained' onClick={props.onAddButtonClick}>
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
                                {props.headerColumns.map(column => (
                                    <TableCell key={column.title.toString()} sx={{...styles.table.head.content.cell, ...column.styles}} width={column.width}>
                                        {column.title}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                    </Table>
                </Box>
                <Box sx={styles.table.body.wrapper}>
                    <Table>
                        <TableBody sx={styles.table.body.content.wrapper}>
                            {props.data.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map(row => (
                                <TableRow sx={styles.table.body.content.row} key={row.id}>
                                    {props.generateBodyRow(row)}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
                <TablePagination
                    sx={styles.table.pagination}
                    rowsPerPageOptions={[5, 10]}
                    count={props.data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default EntityTable;