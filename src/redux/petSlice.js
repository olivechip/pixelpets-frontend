import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const fetchUserPets = createAsyncThunk('pets/fetchUserPets', async (userId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/users/${userId}/pets`, {
        headers: { 'Authorization': `${token}` }
    });
  
    if (!response.ok) {
        throw new Error('Error fetching pets');
    }
  
    const data = await response.json();
    return data;
});

const playWithPet = createAsyncThunk('pets/playWithPet', async (petId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/pets/${petId}/play`, {
        method: 'POST',
        headers: {
            'Authorization': `${token}` 
        }
    });
  
    if (!response.ok) {
      throw new Error('Error playing with pet');
    }

    return { petId, message: 'Played with pet successfully' };
});

const feedPet = createAsyncThunk('pets/feedPet', async (petId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/pets/${petId}/feed`, {
        method: 'POST',
        headers: {
            'Authorization': `${token}` 
        }
    });
  
    if (!response.ok) {
        throw new Error('Error feeding pet');
    }
  
    return { petId, message: 'Pet fed successfully' };
});
  
const petSlice = createSlice({
    name: 'pet',
    initialState: {
      pets: [],
      loading: false,
      error: null
    },
    reducers: {
      // add reducers later if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserPets.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserPets.fulfilled, (state, action) => {
                state.loading = false;
                state.pets = action.payload;
            })
            .addCase(fetchUserPets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(playWithPet.fulfilled, (state, action) => {
                const { petId } = action.payload; 
                const petIndex = state.pets.findIndex(pet => pet.id === petId);
                if (petIndex !== -1) {
                    state.pets[petIndex].hunger = Math.max(Math.min(state.pets[petIndex].hunger - 10, 100), 0);
                    state.pets[petIndex].happiness = Math.max(Math.min(state.pets[petIndex].happiness + 20, 100), 0);
                    state.pets[petIndex].last_fed = new Date().toISOString(); 
                }
            })
            .addCase(playWithPet.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(feedPet.fulfilled, (state, action) => {
                const { petId } = action.payload; 
                const petIndex = state.pets.findIndex(pet => pet.id === petId);
                if (petIndex !== -1) {
                    state.pets[petIndex].hunger = Math.max(Math.min(state.pets[petIndex].hunger + 20, 100), 0); 
                    state.pets[petIndex].happiness = Math.max(Math.min(state.pets[petIndex].happiness + 5, 100), 0);
                    state.pets[petIndex].last_fed = new Date().toISOString(); 
                }
            })
            .addCase(feedPet.rejected, (state, action) => {
                state.error = action.error.message;
            })
    }
});

export const { } = petSlice.actions;
export { fetchUserPets, playWithPet, feedPet };
export default petSlice.reducer;