import { createSlice } from '@reduxjs/toolkit';

export const repositorySlice = createSlice({
  name: 'repository',
  initialState: {
    owner: 'tatsuya1981',
    repo: 'github-viewer',
  },
  reducers: {
    setRepository: (state, action) => {
      state.owner = action.payload.owner;
      state.repo = action.payload.repo;
    },
  },
});

export const { setRepository } = repositorySlice.actions;
export default repositorySlice.reducer;
