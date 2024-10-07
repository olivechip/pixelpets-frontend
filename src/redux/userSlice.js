import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        user: null
    },
    reducers: {
        register: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        login: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        update: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        },
    }
});

export const { register, login, update, logout } = userSlice.actions;
export default userSlice.reducer;