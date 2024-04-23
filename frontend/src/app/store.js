import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/user/user.slice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import propertySlice from '../features/property/property.slice';

const persistConfig = {
    key: "root",
    storage,
    blacklist: ["property"]
};

const rootReducer = combineReducers({
    user: userSlice,
    property: propertySlice
});

const mypersistReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: mypersistReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
});

export default store;
export const persistor = persistStore(store);