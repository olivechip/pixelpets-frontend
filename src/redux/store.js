import { configureStore, createSlice } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root', 
    storage
};
  
const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        user: null
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        register: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        }
    }
});

// Wraps the reducer
const persistedReducer = persistReducer(persistConfig, userSlice.reducer); 

const store = configureStore({
    reducer: {
        user: persistedReducer
    }
});

const persistor = persistStore(store);

export const { login, logout, register } = userSlice.actions;
export { store, persistor };