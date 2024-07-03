import { configureStore } from '@reduxjs/toolkit';
import issueReducer from './issueSlice';
import userReducer from './user';
import modalReducer from './modalSlice';
import repositoryReducer from './repositorySlice';

export const store = configureStore({
  reducer: {
    issues: issueReducer,
    user: userReducer,
    modal: modalReducer,
    repository: repositoryReducer,
  },
});
