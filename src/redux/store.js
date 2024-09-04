import { configureStore, createSlice } from '@reduxjs/toolkit';

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


const store = configureStore({
    reducer: {
        user: userSlice.reducer
    }
});

export const { login, logout, register } = userSlice.actions;
export default store;