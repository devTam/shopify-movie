import { applyMiddleware, createStore } from "redux";
import logger from 'redux-logger';
import reducer from "./reducer";

let middlewares = []

if(process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store = createStore(reducer, applyMiddleware(...middlewares));

