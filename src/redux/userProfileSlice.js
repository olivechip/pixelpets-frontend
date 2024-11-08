import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const fetchUserById = createAsyncThunk('userProfile/fetchUserById', async (userId) => {
    const token = localStorage.getItem('token'); 
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` } 
    });

    if (response.status === 403) {
        window.location.replace('/403');
        return;
    }

    if (response.status === 404) {
        window.location.replace('/404');
        return;
    }

    if (!response.ok) {
        throw new Error('Error fetching user profile'); 
    }

    const data = await response.json();
    return data; 
});

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState: {
        profile: null,
        loading: false, 
        error: null
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload; 
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const {} = userProfileSlice.actions;
export { fetchUserById };
export default userProfileSlice.reducer;