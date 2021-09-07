import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga"

import TasksReducer from "./features/Tasks/Tasks.Slice";
import TasksSaga from "./features/Tasks/Tasks.Saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        tasks: TasksReducer,
    },
    middleware: [sagaMiddleware]
})

sagaMiddleware.run(TasksSaga)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store