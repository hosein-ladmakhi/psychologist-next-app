import { TAction } from "@/types/base.model";
import { createSlice } from "@reduxjs/toolkit";

export const modalSlices = createSlice({
  name: "modalReducers",
  initialState: { currentSubject: "" },
  reducers: {
    openModal: (state, action: TAction<string>) => {
      state.currentSubject = action.payload;
    },
    closeModal: (state) => {
      state.currentSubject = "";
    },
  },
});

export const { closeModal, openModal } = modalSlices.actions;
