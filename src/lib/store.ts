import { combineReducers, configureStore } from "@reduxjs/toolkit";
import jobsReducer from './slices/jobsSlice'
import { mainAPI } from './slices/apiSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";

const rootReducer = combineReducers({
    jobs: jobsReducer,
    [mainAPI.reducerPath]: mainAPI.reducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['jobs']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(mainAPI.middleware)
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;