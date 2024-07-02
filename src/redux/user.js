import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiData } from '../services/userApi';

export const githubUser = createAsyncThunk('user/githubUser', async (username) => {
  const apiUser = await apiData(username);
  return apiUser;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(githubUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(githubUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        console.log(state.data);
      })
      .addCase(githubUser.rejected, (state, action) => {
        state.status = 'failed';
        state.data = action.error.message;
      });
  },
});

export default userSlice.reducer;
