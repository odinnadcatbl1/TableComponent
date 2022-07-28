import axios from "axios";
import { Dispatch } from "react";
import { DataAction, DataActionTypes } from "../../types/types";

export const fetchPosts = () => {
    return async (dispatch: Dispatch<DataAction>) => {
        try {
            dispatch({ type: DataActionTypes.FETCH_DATA_REQUEST });
            const response = await axios.get(
                "https://jsonplaceholder.typicode.com/posts"
            );

            await dispatch({
                type: DataActionTypes.FETCH_DATA_SUCCESS,
                payload: response.data,
            });
        } catch (e) {
            dispatch({
                type: DataActionTypes.FETCH_DATA_FAILURE,
                payload: "Не удалось загрузить данные",
            });
        }
    };
};

export const deleteRow = (id: number) => {
    return {
        type: DataActionTypes.DELETE_ROW,
        payload: id,
    };
};
