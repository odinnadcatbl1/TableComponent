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

const initialState = [
    {
        data: [],
        loading: true,
        error: null,
        sort: "id",
        search: "",
    },
];

export const reducer = (state = initialState, action: DataAction) => {
    switch (action.type) {
        case DataActionTypes.FETCH_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
            };

        case DataActionTypes.FETCH_DATA_REQUEST:
            return {
                ...state,
                data: [],
            };

        case DataActionTypes.FETCH_DATA_FAILURE:
            return {
                ...state,
                data: [],
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
