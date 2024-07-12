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
  const closedIssue = await Promise.all(issueNumber.map((issueNumber) => closeIssue(owner, repo, issueNumber)));
  return { closedIssue, count: closedIssue.length };
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
        NotificationManager.error('一覧を取得できませんでした', 'failed', 10000);
      })
      .addCase(createIssuesAsync.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(createIssuesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        NotificationManager.error('作成に失敗しました', 'failed', 10000);
      })
      .addCase(updateIssuesAsync.fulfilled, (state, action) => {
        const index = state.list.findIndex((issue) => issue.number === action.payload.number);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateIssuesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        NotificationManager.error('更新に失敗しました💦', 'failed', 10000);
      })
      .addCase(closeIssuesAsync.fulfilled, (state, action) => {
        if (Array.isArray(action.payload.closedIssue)) {
          action.payload.closedIssue.forEach((closedIssue) => {
            if (closedIssue && closedIssue.number) {
              const index = state.list.findIndex((issue) => issue.number === closedIssue.number);
              if (index !== -1) {
                state.list[index] = closedIssue;
              }
            }
          });
        }
        const count = action.payload.count;
        NotificationManager.success(`${count} 件 closeしました！`, 'success', 10000);
      })
      .addCase(closeIssuesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        NotificationManager.error('close出来ませんでした', 'failed', 10000);
      });
  },
});

export default issueSlice.reducer;
