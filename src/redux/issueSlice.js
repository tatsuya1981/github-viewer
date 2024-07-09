import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createIssue, fetchIssues, updateIssue, closeIssue } from '../services/issue.Api';
import { NotificationManager } from 'react-notifications';

export const fetchIssuesAsync = createAsyncThunk('issues/fetchIssues', async (_, { getState }) => {
  const { owner, repo } = getState().repository;
  const issues = await fetchIssues(owner, repo);
  return issues;
});

export const createIssuesAsync = createAsyncThunk('issues/createIssue', async (issue, { getState }) => {
  const { owner, repo } = getState().repository;
  const newIssue = await createIssue(owner, repo, issue);
  NotificationManager.success('noda', '成功', '3000');
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

export const closeIssuesAsync = createAsyncThunk('issues/closeIssue', async (issueNumber, { getState }) => {
  const { owner, repo } = getState().repository;
  const closedIssue = await closeIssue(owner, repo, issueNumber);
  return closedIssue;
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
        console.log(state.list);
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
      .addCase(closeIssuesAsync.fulfilled, (state, action) => {
        const index = state.list.findIndex((issue) => issue.number === action.payload.number);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  },
});

export default issueSlice.reducer;
