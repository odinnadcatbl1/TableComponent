export enum DataActionTypes {
    FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS",
    FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE",
    FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST",
}

interface RequestFetchAction {
    type: DataActionTypes.FETCH_POSTS_REQUEST;
}

interface SuccessFetchAction {
    type: DataActionTypes.FETCH_POSTS_SUCCESS;
    payload: [];
}

interface FailureFetchAction {
    type: DataActionTypes.FETCH_POSTS_FAILURE;
    payload: any;
}

export type PostsAction =
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

export const reducer = (state = initialState, action: PostsAction) => {
    switch (action.type) {
        case "FETCH_POSTS_SUCCESS":
            return {
                ...state,
                data: action.payload,
                loading: false,
            };

        case "FETCH_POSTS_REQUEST":
            return {
                ...state,
                data: [],
            };

        case "FETCH_POSTS_FAILURE":
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
