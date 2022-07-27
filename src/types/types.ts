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
    data: [];
    loading: boolean;
    error: any;
}

export interface FilterState {
    search: string;
    sort: string;
}

export enum DataActionTypes {
    FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS",
    FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE",
    FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST",
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

export type DataAction =
    | RequestFetchAction
    | SuccessFetchAction
    | FailureFetchAction;
