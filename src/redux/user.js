import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUser } from '../services/userApi';

const toCamelCase = (str) => {
  return str.replace(/[-_](.)/g, (_, c) => c.toUpperCase());
};

const keysToCamelCase = (obj) => {
  if (typeof obj !== 'object' || obj === null) return obj;
  if (Array.isArray(obj)) return obj.map(keysToCamelCase);
  return Object.keys(obj).reduce((acc, key) => {
    const camelKey = toCamelCase(key);
    acc[camelKey] = keysToCamelCase(obj[key]);
    return acc;
  }, {});
};

export const githubUser = createAsyncThunk('user/githubUser', async (username) => {
  const apiUser = await fetchUser(username);
  return keysToCamelCase(apiUser);
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
      })
      .addCase(githubUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
