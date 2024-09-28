import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer, { login, logout, register } from './userSlice';
import userProfileReducer, { fetchUserById } from './userProfileSlice';
import petReducer, { fetchPetById, fetchUserPets, deletePet, playWithPet, feedPet, petAnotherPet } from './petSlice';
import poundReducer, { fetchPoundPets, abandonPet, adoptPet } from './poundSlice';

const persistConfig = {
    key: 'user', 
    storage
};

// Wraps the reducer
const rootReducer = {
    user: persistReducer(persistConfig, userReducer),
    userProfile: userProfileReducer,
    pets: petReducer,
    pound: poundReducer
};

const store = configureStore({
    reducer: rootReducer
});

const persistor = persistStore(store);

export { store, persistor, 
    login, logout, register, 
    fetchUserById,
    fetchPetById, fetchUserPets, deletePet, playWithPet, feedPet, petAnotherPet, 
    fetchPoundPets, abandonPet, adoptPet 
};