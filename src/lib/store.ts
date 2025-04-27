import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from './slices/jobsSlice'
import { mainAPI } from './slices/apiSlice'

export const store = configureStore({
    reducer: {
        [mainAPI.reducerPath]: mainAPI.reducer,
        jobs: jobsReducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(mainAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;