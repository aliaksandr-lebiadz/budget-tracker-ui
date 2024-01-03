import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { usePrevious } from '../../hooks';
import { changeBank, getBanks } from '../../store/bank/bankSlice';
import { BankDto } from '../../store/bank/types';
import { BankService } from '../../services';

import {
    EntityTable,
    EntityTableTextCell,
    EntityTableIconCell,
    EntityTableActionsCell,
} from '../../components/entity/table';
import NewBankDialog from './new/NewBankDialog';
import DeleteBankAlert from './alert/DeleteBankAlert';

interface DeleteAlertOptions {
    open: boolean,
    id: number | null,
};

const editingErrorsInitialState = {
    name: false,
    show: false,
};

const BanksView = () => {

    const dispatch = useAppDispatch();

    const loading = useAppSelector((state) => state.banks.loading);
    const banks = useAppSelector((state) => state.banks.data);
    const previousLoading = usePrevious(loading);

    const [deleteAlertOptions, setDeleteAlertOptions] = useState<DeleteAlertOptions>({
        open: false,
        id: null,
    });
    const [newDialogOpen, setNewDialogOpen] = useState(false);

    const [editing, setEditing] = useState<BankDto>();
    const [editingErrors, setEditingErrors] = useState(editingErrorsInitialState);

    useEffect(() => {

        dispatch(getBanks());
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

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { value } = e.target;
        setEditing(previousState => ({
            ...previousState!,
            name: value,
        }));
        setEditingErrors(previousErrors => ({
            ...previousErrors,
            //@ts-ignore
            name: previousErrors.show ? !BankService.isNameValid(value) : previousErrors.name,
        }));
    };

    const handleIconChange = (value: string) => {

        setEditing(previousState => ({
            ...previousState!,
            icon: value,
        }));
    };

    const handleEditingAccept = (row: BankDto) => {
        
        const nameValid = BankService.isNameValid(editing?.name);
        if (!nameValid) {
            setEditingErrors({
                name: !nameValid,
                show: true,
            });
        } else if (editing?.name !== row.name || editing?.icon !== row.icon) {
            dispatch(changeBank(editing!));
        } else {
            handleCloseIconClick();
        }
    };

    const handleEditIconClick = (row: BankDto) => {

        setEditing(row);
    };

    const handleCloseIconClick = () => {

        setEditing(undefined);
        setEditingErrors(editingErrorsInitialState);
    };

    const toggleNewDialog = () => {

        setNewDialogOpen(previousOpen => !previousOpen);
    };

    return (
        <>
            <EntityTable
                title='Banks'
                loading={loading.get}
                data={banks}
                headerColumns={[
                    {
                        title: 'Name',
                        width: 200,
                    },
                    {
                        title: 'Icon',
                        width: 150,
                        styles: { paddingLeft: '26px' },
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
                                errorMessage: BankService.messages.invalidName,

                                onChange: handleNameChange,
                                onEnterKeyDown: () => handleEditingAccept(row),
                                onEscapeKeyDown: handleCloseIconClick,
                            }}
                            regularProps={{
                                value: row.name,
                            }}
                        />
                        <EntityTableIconCell
                            width={150}
                            editing={editing?.id === row.id}
                            editingProps={{
                                defaultValue: editing?.icon,
                                errorMessage: BankService.messages.invalidIcon,

                                isValid: BankService.isIconValid,
                                onChange: handleIconChange,
                            }}
                            regularProps={{
                                value: row.icon,
                            }}
                        />
                        <EntityTableActionsCell
                            editing={editing?.id === row.id}
                            editingProps={{
                                error: editingErrors.name,

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
                <DeleteBankAlert
                    id={deleteAlertOptions.id!}
                    onClose={handleDeleteAlertClose}
                />
            }
            {newDialogOpen &&
                <NewBankDialog onClose={toggleNewDialog}/>
            }
        </>
    );
};

export default BanksView;
