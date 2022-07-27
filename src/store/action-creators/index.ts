import axios from "axios";
import { Dispatch } from "react";
import { DataAction } from "../reducers";
import { DataActionTypes } from "../reducers";

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
                payload: e,
            });
        }
    };
};
