import { HasId } from "../../types/common";
import { LoadingState } from "../../types/store";

export enum CurrencyAsyncActionType {
    GET = 'currencies/get',
    ADD = 'currencies/add',
    CHANGE = 'currencies/change',
    DELETE = 'currencies/delete',
};

export interface NewCurrencyDto {
    name: string,
    code: string,
};

export interface CurrencyDto extends NewCurrencyDto, HasId {

};

export interface CurrencyState {
    data: CurrencyDto[],
    loading: LoadingState,
};
