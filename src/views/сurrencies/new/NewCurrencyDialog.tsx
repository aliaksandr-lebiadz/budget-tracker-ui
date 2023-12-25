import { useState } from 'react';
import { useAppDispatch } from '../../../store/store';
import { addCurrency } from '../../../store/currency/currencySlice';
import { CurrencyService } from '../../../services';

import NewEntityDialog from '../../../components/entity/new/NewEntityDialog';
import NewEntityDialogTextField from '../../../components/entity/new/field/NewEntityDialogTextField';

interface Props {
    onClose: () => void,
};

interface FieldsState {
    name?: string,
    code?: string,
};

interface ErrorsState {
    name: boolean,
    code: boolean,
    show: boolean,
};

const errorsInitialState = {
    name: false,
    code: false,
    show: false,
};

const NewCurrencyDialog = (props: Props) => {

    const dispatch = useAppDispatch();

    const [fields, setFields] = useState<FieldsState>({});
    const [errors, setErrors] = useState<ErrorsState>(errorsInitialState);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;
        setFields(previousFields => ({
            ...previousFields,
            [name]: value,
        }));
        setErrors(previousErrors => ({
            ...previousErrors,
            //@ts-ignore
            [name]: previousErrors.show ? !CurrencyService.isValid(name, value) : previousErrors[name],
        }));
    };

    const handleSubmit: React.FormEventHandler<HTMLDivElement> = (e: React.FormEvent<HTMLDivElement>) => {
        
        e.preventDefault();

        const nameValid = CurrencyService.isNameValid(fields.name);
        const codeValid = CurrencyService.isCodeValid(fields.code);
        if (!nameValid || !codeValid) {
            setErrors({
                name: !nameValid,
                code: !codeValid,
                show: true,
            });
        } else {
            dispatch(addCurrency({
                name: fields.name!,
                code: fields.code!,
            }));
        }
    };

    return (
        <NewEntityDialog
            title='New currency'
            fields={
                <>
                    <NewEntityDialogTextField
                        label='Name'
                        name='name'
                        autoFocus
                        error={errors.name}
                        errorMessage={CurrencyService.messages.invalidName}
                        onChange={handleInputChange}
                    />
                    <NewEntityDialogTextField
                        label='Code'
                        name='code'
                        error={errors.code}
                        errorMessage={CurrencyService.messages.invalidCode}
                        onChange={handleInputChange}
                    />
                </>
            }
            onClose={props.onClose}
            onSubmit={handleSubmit}
        />
    );
};

export default NewCurrencyDialog;
