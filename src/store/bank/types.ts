import { HasId } from '../../types/common';
import { LoadingState } from '../../types/store';

export enum BankAsyncActionType {
    GET = 'banks/get',
    ADD = 'banks/add',
    CHANGE = 'banks/change',
    DELETE = 'banks/delete',
};

export interface NewBankDto {
    name: string,
    icon: string
};

export interface BankDto extends NewBankDto, HasId {
    
};

export interface BankState {
    data: BankDto[],
    loading: LoadingState,
};
