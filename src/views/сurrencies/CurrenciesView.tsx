import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { usePrevious } from '../../hooks';
import { changeCurrency, getCurrencies } from '../../store/currency/currencySlice';
import { CurrencyDto } from '../../store/currency/types';
import { CurrencyService } from '../../services';

import {
    EntityTable,
    EntityTableTextCell,
    EntityTableActionsCell,
} from '../../components/entity/table';
import DeleteCurrencyAlert from './delete/DeleteCurrencyAlert';
import NewCurrencyDialog from './new/NewCurrencyDialog';

interface DeleteAlertOptions {
    open: boolean,
    id: number | null,
};

const editingErrorsInitialState = {
    name: false,
    code: false,
    show: false,
};

const CurrenciesView = () => {

    const dispatch = useAppDispatch();

    const loading = useAppSelector((state) => state.currencies.loading);
    const currencies = useAppSelector((state) => state.currencies.data);
    const previousLoading = usePrevious(loading);

    const [deleteAlertOptions, setDeleteAlertOptions] = useState<DeleteAlertOptions>({
        open: false,
        id: null,
    });
    const [newDialogOpen, setNewDialogOpen] = useState(false);

    const [editing, setEditing] = useState<CurrencyDto>();
    const [editingErrors, setEditingErrors] = useState(editingErrorsInitialState);

    useEffect(() => {

        dispatch(getCurrencies());
    }, [dispatch]);

    useEffect(() => {
        
        if (previousLoading.add && !loading.add) {
            toggleNewDialog();
        }
    }, [loading.add, previousLoading.add]);

    useEffect(() => {
        
        if (previousLoading.change && !loading.change) {
            handleCloseIconClick();
        }
    }, [loading.change, previousLoading.change]);

    useEffect(() => {
        
        if (previousLoading.delete && !loading.delete) {
            handleDeleteAlertClose();
        }
    }, [loading.delete, previousLoading.delete]);

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
    };

    const handleEditIconClick = (row: CurrencyDto) => {

        setEditing(row);
    };

    const handleCloseIconClick = () => {

        setEditing(undefined);
        setEditingErrors(editingErrorsInitialState);
    };

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {

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

        setNewDialogOpen(previousOpen => !previousOpen);
    };

    return (
        <>
            <EntityTable
                title='Currencies'
                loading={loading.get}
                data={currencies}
                headerColumns={[
                    {
                        title: 'Name',
                        width: 200,
                    },
                    {
                        title: 'Code',
                        width: 150,
                    },
                    {
                        title: 'Actions',
                        width: 150,
                        styles: { paddingLeft: '40px' },
                    }
                ]}
                generateBodyRow={(row) => (
                    <>
                        <EntityTableTextCell
                            width={200}
                            editing={editing?.id === row.id}
                            editingProps={{
                                name: 'name',
                                autoFocus: true,
                                defaultValue: editing?.name,
                                error: editingErrors.name,
                                errorMessage: CurrencyService.messages.invalidName,

                                onChange: handleFieldChange,
                                onEnterKeyDown: () => handleEditingAccept(row),
                                onEscapeKeyDown: handleCloseIconClick,
                            }}
                            regularProps={{
                                value: row.name,
                            }}
                        />
                        <EntityTableTextCell
                            width={150}
                            editing={editing?.id === row.id}
                            editingProps={{
                                name: 'code',
                                defaultValue: editing?.code,
                                error: editingErrors.code,
                                errorMessage: CurrencyService.messages.invalidCode,

                                onChange: handleFieldChange,
                                onEnterKeyDown: () => handleEditingAccept(row),
                                onEscapeKeyDown: handleCloseIconClick,
                            }}
                            regularProps={{
                                value: row.code,
                            }}
                        />
                        <EntityTableActionsCell
                            editing={editing?.id === row.id}
                            editingProps={{
                                error: editingErrors.name || editingErrors.code,

                                onAcceptClick: () => handleEditingAccept(row),
                                onCloseClick: handleCloseIconClick, 
                            }}
                            regularProps={{
                                onEditClick: () => handleEditIconClick(row),
                                onDeleteClick: () => handleDeleteIconClick(row.id),
                            }}
                        />
                    </>
                )}
                onAddButtonClick={toggleNewDialog}
            />
            {deleteAlertOptions.open &&
                <DeleteCurrencyAlert
                    id={deleteAlertOptions.id!}
                    onClose={handleDeleteAlertClose}
                />
            }
            {newDialogOpen &&
                <NewCurrencyDialog onClose={toggleNewDialog}/>
            }
        </>
    );
};

export default CurrenciesView;