export interface ITableData {
    id: string;
    data: {
        name: string;
        description: string;
        structure: {
            id: string;
            name: string;
        }[];
        data: any[];
    };
}
export interface DataState {
    data: any[];
    loading: boolean;
    error: string;
}
export interface FilterState {
    search: string;
    sort: string;
}

export enum DataActionTypes {
    FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS",
    FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE",
    FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST",
    DELETE_ROW = "DELETE_ROW",
}

interface RequestFetchAction {
    type: DataActionTypes.FETCH_DATA_REQUEST;
}

interface SuccessFetchAction {
    type: DataActionTypes.FETCH_DATA_SUCCESS;
    payload: [];
}

interface FailureFetchAction {
    type: DataActionTypes.FETCH_DATA_FAILURE;
    payload: any;
}

interface DeleteRow {
    type: DataActionTypes.DELETE_ROW;
    payload: number;
}

export type DataAction =
    | RequestFetchAction
    | SuccessFetchAction
    | FailureFetchAction
    | DeleteRow;

export interface IPaginateProps {
    currentData: any[];
    next: () => void;
    prev: () => void;
    jump: (page: number) => void;
    currentPage: number;
    maxPage: number;
}

export interface IConfirmProps {
    onConfirm: (choose: boolean) => void;
    message: string;
}

export interface ISearchProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}
