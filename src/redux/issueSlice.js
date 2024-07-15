import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createIssue, fetchIssues, updateIssue, closeIssue } from '../services/api/issue';

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

export const fetchIssuesAsync = createAsyncThunk('issues/fetchIssues', async (_, { getState }) => {
  const { owner, repo } = getState().repository;
  const issues = await fetchIssues(owner, repo);
  return keysToCamelCase(issues);
});

export const createIssuesAsync = createAsyncThunk('issues/createIssue', async (issue, { getState }) => {
  const { owner, repo } = getState().repository;
  const newIssue = await createIssue(owner, repo, issue);
  return keysToCamelCase(newIssue);
});

export const updateIssuesAsync = createAsyncThunk(
  'issues/updateIssue',
  async ({ issueNumber, updatedIssue }, { getState }) => {
    const { owner, repo } = getState().repository;
    const updatedIssueData = await updateIssue(owner, repo, issueNumber, updatedIssue);
    return keysToCamelCase(updatedIssueData);
  },
);

export const closeIssuesAsync = createAsyncThunk('issues/closeIssue', async (issueNumber, { getState }) => {
  const { owner, repo } = getState().repository;
  const closedIssues = await Promise.all(issueNumber.map((issueNumber) => closeIssue(owner, repo, issueNumber)));
  const closeCamelCase = keysToCamelCase(closedIssues);
  return { closedIssue: closeCamelCase, count: closedIssues.length };
});

const initialState = {
  list: [],
  status: 'idle',
  error: null,
  lastAction: null,
  closeCount: null,
};

export const issueSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = initialState.status;
      state.lastAction = initialState.lastAction;
      state.error = initialState.error;
      state.closeCount = initialState.closeCount;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssuesAsync.pending, (state) => {
        state.status = 'loading';
        state.lastAction = 'fetch';
      })
      .addCase(fetchIssuesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lastAction = 'fetch';
        state.list = action.payload;
      })
      .addCase(fetchIssuesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.lastAction = 'fetch';
        state.error = action.error.message;
      })
      .addCase(createIssuesAsync.pending, (state) => {
        state.status = 'loading';
        state.lastAction = 'create';
      })
      .addCase(createIssuesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lastAction = 'create';
        state.list.push(action.payload);
      })
      .addCase(createIssuesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.lastAction = 'create';
      })
      .addCase(updateIssuesAsync.pending, (state) => {
        state.status = 'loading';
        state.lastAction = 'update';
      })
      .addCase(updateIssuesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lastAction = 'update';
        const index = state.list.findIndex((issue) => issue.number === action.payload.number);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateIssuesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.lastAction = 'update';
        state.error = action.error.message;
      })
      .addCase(closeIssuesAsync.pending, (state) => {
        state.status = 'loading';
        state.lastAction = 'close';
      })
      .addCase(closeIssuesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lastAction = 'close';
        state.closeCount = action.payload.count;
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
      })
      .addCase(closeIssuesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.lastAction = 'close';
        state.error = action.error.message;
      });
  },
});

export const { resetStatus } = issueSlice.actions;
export default issueSlice.reducer;
