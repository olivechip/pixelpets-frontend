import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer, { login, logout, register } from './userSlice';
import petReducer, { fetchUserPets, playWithPet, feedPet } from './petSlice';
import poundReducer, { fetchPoundPets, abandonPet, adoptPet } from './poundSlice';

const persistConfig = {
    key: 'user', 
    storage
};

// Wraps the reducer
const rootReducer = {
    user: persistReducer(persistConfig, userReducer),
    pets: petReducer,
    pound: poundReducer
};

const store = configureStore({
    reducer: rootReducer
});

const persistor = persistStore(store);

export { store, persistor, 
    login, logout, register, 
    fetchUserPets, playWithPet, feedPet, 
    fetchPoundPets, abandonPet, adoptPet 
};