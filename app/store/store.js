import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import searchReducer from './searchSlice';
import favorites from './favoritesSlice';
import cartReducer from './cartSlice';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['favorites', 'search', 'cart'],
};

const rootReducer = combineReducers({
    search: searchReducer,
    favorites: favorites,
    cart: cartReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});


export const persistor = persistStore(store);

export default store;