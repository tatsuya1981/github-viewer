import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'isOpen',
  initialState: {
    isModalOpen: false,
  },
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
