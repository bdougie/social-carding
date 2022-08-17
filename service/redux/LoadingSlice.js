import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    loading: false,
  },
  reducers: {
    leLoadingToggle: (state) => {
      state.loading = !state.loading;
    },
  },
});

// Action creators are generated for each case reducer function
export const { leLoadingToggle } = loadingSlice.actions;

export default loadingSlice.reducer;
