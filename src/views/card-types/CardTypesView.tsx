import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { usePrevious } from '../../hooks';
import { changeCardType, getCardTypes } from '../../store/card-type/cardTypeSlice';
import { CardTypeDto } from '../../store/card-type/types';
import CardTypeService from '../../services/CardTypeService';

import EntityTable from '../../components/entity/table/EntityTable';
import EntityTableTextCell from '../../components/entity/table/cell/EntityTableTextCell';
import EntityTableIconCell from '../../components/entity/table/cell/EntityTableIconCell';
import EntityTableActionsCell from '../../components/entity/table/cell/EntityTableActionsCell';
import NewCardTypeDialog from './new/NewCardTypeDialog';
import DeleteCardTypeAlert from './alert/DeleteCardTypeAlert';

interface DeleteAlertOptions {
    open: boolean,
    id: number | null,
};

const editingErrorsInitialState = {
    name: false,
    show: false,
};

const CardTypesView = () => {

    const dispatch = useAppDispatch();

    const loading = useAppSelector((state) => state.cardTypes.loading);
    const cardTypes = useAppSelector((state) => state.cardTypes.data);
    const previousLoading = usePrevious(loading);

    const [deleteAlertOptions, setDeleteAlertOptions] = useState<DeleteAlertOptions>({
        open: false,
        id: null,
    });
    const [newDialogOpen, setNewDialogOpen] = useState(false);

    const [editing, setEditing] = useState<CardTypeDto>();
    const [editingErrors, setEditingErrors] = useState(editingErrorsInitialState);

    useEffect(() => {

        dispatch(getCardTypes());
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
            name: previousErrors.show ? !CardTypeService.isNameValid(value) : previousErrors.name,
        }));
    };

    const handleIconChange = (value: string) => {

        setEditing(previousState => ({
            ...previousState!,
            icon: value,
        }));
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

    const handleEditIconClick = (row: CardTypeDto) => {

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
                title='Card Types'
                loading={loading.get}
                data={cardTypes}
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
                                errorMessage: CardTypeService.messages.invalidName,

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
                                errorMessage: CardTypeService.messages.invalidIcon,

                                isValid: CardTypeService.isIconValid,
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
                <DeleteCardTypeAlert
                    id={deleteAlertOptions.id!}
                    onClose={handleDeleteAlertClose}
                />
            }
            {newDialogOpen &&
                <NewCardTypeDialog onClose={toggleNewDialog}/>
            }
        </>
    );
};

export default CardTypesView;
