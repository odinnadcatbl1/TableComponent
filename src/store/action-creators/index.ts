import axios from "axios";
import { Dispatch } from "react";
import { PostsAction } from "../reducers";
import { DataActionTypes } from "../reducers";

export const fetchPosts = () => {
    return async (dispatch: Dispatch<PostsAction>) => {
        try {
            dispatch({ type: DataActionTypes.FETCH_POSTS_REQUEST });
            const response = await axios.get(
                "https://jsonplaceholder.typicode.com/posts"
            );

            await dispatch({
                type: DataActionTypes.FETCH_POSTS_SUCCESS,
                payload: response.data,
            });
        } catch (e) {
            dispatch({
                type: DataActionTypes.FETCH_POSTS_FAILURE,
                payload: e,
            });
        }
    };
};
