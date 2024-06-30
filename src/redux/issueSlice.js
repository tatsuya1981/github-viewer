import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createIssue, fetchIssues, updateIssue, deleteIssue } from '../services/issue.Api';

export const fetchIssuesAsync = createAsyncThunk('issues/fetchIssues', async (_, { getState }) => {
  const { owner, repo } = getState().repository;
  const issues = await fetchIssues(owner, repo);
  return issues;
});

export const createIssuesAsync = createAsyncThunk('issues/createIssue', async (issue, { getState }) => {
  const { owner, repo } = getState().repository;
  const newIssue = await createIssue(owner, repo, issue);
  return newIssue;
});

export const updateIssuesAsync = createAsyncThunk(
  'issues/updateIssue',
  async ({ issueNumber, updatedIssue }, { getState }) => {
    const { owner, repo } = getState().repository;
    const updatedIssueData = await updateIssue(owner, repo, issueNumber, updatedIssue);
    return updatedIssueData;
  },
);

export const deleteIssuesAsync = createAsyncThunk('issues/deleteIssue', async (issueNumber, { getState }) => {
  const { owner, repo } = getState().repository;
  await deleteIssue(owner, repo, issueNumber);
  return issueNumber;
});

export const issueSlice = createSlice({
  name: 'issues',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssuesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIssuesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchIssuesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createIssuesAsync.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateIssuesAsync.fulfilled, (state, action) => {
        const index = state.list.findIndex((issue) => issue.number === action.payload.number);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteIssuesAsync.fulfilled, (state, action) => {
        state.list = state.list.filter((issue) => issue.number !== action.payload);
      });
  },
});

export default issueSlice.reducer;
