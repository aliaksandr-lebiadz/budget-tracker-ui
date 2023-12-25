import { useState } from 'react';
import { useAppDispatch } from '../../../store/store';
import { addCardType } from '../../../store/card-type/cardTypeSlice';
import CardTypeService from '../../../services/CardTypeService';

import NewEntityDialog from '../../../components/entity/new/NewEntityDialog';
import NewEntityDialogTextField from '../../../components/entity/new/field/NewEntityDialogTextField';
import NewEntityDialogIconField from '../../../components/entity/new/field/NewEntityDialogIconField';

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

const NewCardTypeDialog = (props: Props) => {

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
            name: previousErrors.show ? !CardTypeService.isNameValid(value) : previousErrors.name,
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

        const nameValid = CardTypeService.isNameValid(fields.name);
        const iconValid = fields.icon !== undefined;
        if (!nameValid || !iconValid) {
            setErrors({
                name: !nameValid,
                icon: !iconValid,
                show: true,
            });
        } else {
            dispatch(addCardType({
                name: fields.name!,
                icon: fields.icon!,
            }));
        }
    };

    return (
        <NewEntityDialog
            title='New card type'
            fields={
                <>
                    <NewEntityDialogTextField
                        label='Name'
                        name='name'
                        autoFocus
                        error={errors.name}
                        errorMessage={CardTypeService.messages.invalidName}
                        onChange={handleNameChange}
                    />
                    <NewEntityDialogIconField
                        label='Icon'
                        value={fields.icon}
                        error={errors.icon}
                        errorMessage={CardTypeService.messages.invalidIcon}
                        isValid={CardTypeService.isIconValid}
                        onChange={handleIconChange}
                    />
                </>
            }
            onClose={props.onClose}
            onSubmit={handleSubmit}
        />
    );
};

export default NewCardTypeDialog;
