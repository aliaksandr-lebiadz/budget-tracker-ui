import { useState } from 'react';
import { useAppDispatch } from '../../../store/store';
import { addBank } from '../../../store/bank/bankSlice';
import { BankService } from '../../../services';

import {
    NewEntityDialog,
    NewEntityDialogTextField,
    NewEntityDialogIconField,
} from '../../../components/entity/new';

const errorsInitialState = {
    name: false,
    icon: false,
    show: false,
};

interface Props {
    onClose: () => void,
};

interface FieldsState {
    name?: string,
    icon?: string,
};

interface ErrorsState {
    name: boolean,
    icon: boolean,
    show: boolean,
};

const NewBankDialog = (props: Props) => {

    const dispatch = useAppDispatch();

    const [fields, setFields] = useState<FieldsState>({});
    const [errors, setErrors] = useState<ErrorsState>(errorsInitialState);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { value } = e.target;
        setFields(previousFields => ({
            ...previousFields,
            name: value,
        }));
        setErrors(previousErrors => ({
            ...previousErrors,
            name: previousErrors.show ? !BankService.isNameValid(value) : previousErrors.name,
        }));
    };

    const handleIconChange = (value: string) => {

        setFields(previousState => ({
            ...previousState!,
            icon: value,
        }));
        setErrors(previousErrors => ({
            ...previousErrors,
            icon: false,
        }));
    };

    const handleSubmit: React.FormEventHandler<HTMLDivElement> = (e: React.FormEvent<HTMLDivElement>) => {
        
        e.preventDefault();

        const nameValid = BankService.isNameValid(fields.name);
        const iconValid = fields.icon !== undefined;
        if (!nameValid || !iconValid) {
            setErrors({
                name: !nameValid,
                icon: !iconValid,
                show: true,
            });
        } else {
            dispatch(addBank({
                name: fields.name!,
                icon: fields.icon!,
            }));
        }
    };

    return (
        <NewEntityDialog
            title='New bank'
            fields={
                <>
                    <NewEntityDialogTextField
                        label='Name'
                        name='name'
                        autoFocus
                        error={errors.name}
                        errorMessage={BankService.messages.invalidName}
                        onChange={handleNameChange}
                    />
                    <NewEntityDialogIconField
                        label='Icon'
                        value={fields.icon}
                        error={errors.icon}
                        errorMessage={BankService.messages.invalidIcon}
                        isValid={BankService.isIconValid}
                        onChange={handleIconChange}
                    />
                </>
            }
            onClose={props.onClose}
            onSubmit={handleSubmit}
        />
    );
};

export default NewBankDialog;
