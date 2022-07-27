import { createStore, applyMiddleware } from "redux";
import { reducer } from "./reducers";
import ThunkMiddleware from "redux-thunk";

export const store = createStore(reducer, applyMiddleware(ThunkMiddleware));
