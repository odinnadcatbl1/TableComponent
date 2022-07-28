import { DataState } from "../../types/types";
import { DataAction, DataActionTypes } from "../../types/types";

const initialState: DataState = {
    data: [],
    loading: true,
    error: "",
};

export const dataReducer = (state = initialState, action: DataAction) => {
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
                loading: true,
            };

        case DataActionTypes.FETCH_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case DataActionTypes.DELETE_ROW:
            const newData = state.data.filter((row) => {
                if (row.id !== action.payload) {
                    return true;
                }
            });
            return {
                ...state,
                data: newData,
            };

        default:
            return state;
    }
};
