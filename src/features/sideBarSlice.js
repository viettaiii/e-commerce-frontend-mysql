import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideBarOpen: true,
};

const sideBarSlice = createSlice({
  name: "sideBar",
  initialState,
  reducers: {
    setSideBarOpen: (action, state) => {
      state.isSideBarOpen = action.payload;
    },
  },
});

export const {} = sideBarSlice.actions;
export default sideBarSlice.reducer;
