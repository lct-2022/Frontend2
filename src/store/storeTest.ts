import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { BaseState, rootReducer } from './reducers';
import { activeUserReducer } from "./reducers/activeUser";
import { projectsReducer } from "./reducers/projects";
import type { Reducer } from '@reduxjs/toolkit';
import { CommonAction } from "./types";

// declare const reducer: Reducer<{}>

const preloadedState: BaseState = {
    activeUser: null,
    projects: [],
}

// const reducer: Reducer<BaseState, CommonAction<any>> = {
//     activeUser: activeUserReducer,
//     posts: projectsReducer,
// }


// const configureStoreOptions = {
//     reducer,
//     preloadedState,
//     devTools: process.env.NODE_ENV !== 'production',
// }

// export const store = configureStore(
//     configureStoreOptions,
//     // rootReducer, applyMiddleware(thunk), {}
//     );
