// import { configureStore } from "@reduxjs/toolkit";
// import { applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { BaseState, rootReducer } from './reducers';
// import { authUserReducer } from "./reducers/authUser";
// import { projectsReducer } from "./reducers/projects";
// import type { Reducer } from '@reduxjs/toolkit';
// import { CommonAction } from "../types";

// declare const reducer: Reducer<{}>

// const preloadedState: BaseState = {
//     authUser: null,
//     projects: [],
// }

// const reducer: Reducer<BaseState, CommonAction<any>> = {
//     authUser: authUserReducer,
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
