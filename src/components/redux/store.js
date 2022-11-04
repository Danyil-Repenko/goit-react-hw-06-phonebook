import { configureStore } from "@reduxjs/toolkit";
import { contactReducer } from "./contactSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "redux";
import { filterReducer } from "./filterSlice";

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    contacts: contactReducer,
    filter: filterReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)