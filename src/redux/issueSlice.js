import { createSlice } from '@reduxjs/toolkit';

const today = new Date()
  .toLocaleDateString('ja-JP', { day: '2-digit', month: '2-digit', year: 'numeric' })
  .replaceAll('/', '-');

const issues = [
  {
    id: 1,
    title: 'A bug in Top Page',
    status: 'Open',
    user: '',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    creationDate: today,
    updateDate: today,
  },
  {
    id: 2,
    title: 'A problem of performance in Top Page',
    status: 'Open',
    user: '',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    creationDate: today,
    updateDate: today,
  },
  {
    id: 3,
    title: 'fix layout',
    status: 'Open',
    user: '',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    creationDate: today,
    updateDate: today,
  },
];

export const issueSlice = createSlice({
  name: 'issues',
  initialState: {
    list: issues,
  },
  reducers: {
    addIssue: (state, action) => {
      state.list.push(action.payload);
    },
    updateIssue: (state, action) => {
      const index = state.list.findIndex((issue) => issue.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload };
      }
    },
    deleteIssue: (state, action) => {
      state.list = state.list.filter((issue) => issue.id !== action.payload);
    },
  },
});

export const { addIssue, updateIssue, deleteIssue } = issueSlice.actions;
export default issueSlice.reducer;
