import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const fetchPetById = createAsyncThunk('pets/fetchPetById', async (petId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/pets/${petId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
        throw new Error('Error fetching pet details');
    }

    const data = await response.json();
    return data;
});

const fetchUserPets = createAsyncThunk('pets/fetchUserPets', async (userId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/users/${userId}/pets`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
  
    if (!response.ok) {
        throw new Error('Error fetching pets');
    }
  
    const data = await response.json();
    return data;
});

const deletePet = createAsyncThunk('pets/deletePet', async (petId, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/pets/${petId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        return rejectWithValue('An error occurred while deleting the pet.');
    }

    dispatch(fetchUserPets(user.id)); 
    return { petId };
});

const playWithPet = createAsyncThunk('pets/playWithPet', async ({ petId, userId }, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/pets/${petId}/play`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}` 
        }
    });
    
    if (!response.ok) {
        // Handle the "too hungry" error
        if (response.status === 400 || response.status === 403) { 
            const errorData = await response.json();
            return rejectWithValue(errorData.error); 
        } else {
            return rejectWithValue('An error occurred while playing with the pet.');
        }
    }

    dispatch(fetchUserPets(userId));
    return { petId };
});

const feedPet = createAsyncThunk('pets/feedPet', async ({ petId, userId }, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/pets/${petId}/feed`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}` 
        }
    });
  
    if (!response.ok) {
        // Handle the "only feed your own pet" error
        if (response.status === 400 || response.status === 403) { 
            const errorData = await response.json();
            return rejectWithValue(errorData.error); 
        } else {
            return rejectWithValue('An error occurred while playing with the pet.');
        }
    }

    dispatch(fetchUserPets(userId));
    return { petId };
});
  

const petAnotherPet = createAsyncThunk('pets/petAnotherPet', async (petId, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/pets/${petId}/pet`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    // console.log(response)

    if (!response.ok) {
        // Handle the "once per day" error
        if (response.status === 400) {
            const errorData = await response.json();
            return rejectWithValue(errorData.error); 
        } else {
            return rejectWithValue('An error occurred while petting the pet.');
        }
    }

    return { petId };
});

const petSlice = createSlice({
    name: 'pet',
    initialState: {
      pets: [],
      loading: false,
      error: null,
    },
    reducers: {
        // add reducers if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPetById.pending, (state) => {
                state.loading = true;
                state.error = null; 
            })
            .addCase(fetchPetById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedPet = action.payload; 
            })
            .addCase(fetchPetById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
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
            .addCase(playWithPet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(playWithPet.fulfilled, (state, action) => {
                state.loading = false;
                const { petId } = action.payload; 
                const petIndex = state.pets.findIndex(pet => pet.id === petId);
                if (petIndex !== -1) {
                    state.pets[petIndex].happiness = Math.max(Math.min(state.pets[petIndex].happiness + 20, 100), 0);
                    state.pets[petIndex].hunger = Math.max(Math.min(state.pets[petIndex].hunger - 10, 100), 0);
                }
            })
            .addCase(playWithPet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(feedPet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(feedPet.fulfilled, (state, action) => {
                state.loading = false;
                const { petId } = action.payload; 
                const petIndex = state.pets.findIndex(pet => pet.id === petId);
                if (petIndex !== -1) {
                    state.pets[petIndex].hunger = Math.max(Math.min(state.pets[petIndex].hunger + 20, 100), 0); 
                }
            })
            .addCase(feedPet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(petAnotherPet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(petAnotherPet.fulfilled, (state, action) => {
                state.loading = false;
                const { petId } = action.payload;
                if (state.selectedPet && state.selectedPet.id === petId) {
                    state.selectedPet.popularity += 1;
                }
            })
            .addCase(petAnotherPet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { } = petSlice.actions;
export { fetchPetById, deletePet, fetchUserPets, playWithPet, feedPet, petAnotherPet };
export default petSlice.reducer;