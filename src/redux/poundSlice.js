import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const fetchPoundPets = createAsyncThunk('/pound/fetchPoundPets', async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/pound`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
  
    if (!response.ok) {
        throw new Error('Error fetching pets from the pound');
    }
  
    const data = await response.json();
    return data;
});

const abandonPet = createAsyncThunk('/pound/abandon', async (petId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/pound/abandon/${petId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Error abandoning pet');
    }
    
    return { petId };
});

const adoptPet = createAsyncThunk('/pound/adopt', async (petId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/pound/adopt/${petId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    if (!response.ok) {
        throw new Error('Error adopting pet');
    }
    
    return { petId };
});

const poundSlice = createSlice({
    name: 'pound',
    initialState: {
        poundPets: [], 
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPoundPets.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPoundPets.fulfilled, (state, action) => {
                state.loading = false;
                state.poundPets = action.payload;
            })
            .addCase(fetchPoundPets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export { fetchPoundPets, abandonPet, adoptPet };
export default poundSlice.reducer;