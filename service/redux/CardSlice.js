import { createSlice } from "@reduxjs/toolkit";

export const cardSlice = createSlice({
  name: "card",
  initialState: {
    card: null,
  },
  reducers: {
    setCard: (state, actions) => {
      state.card = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCard } = cardSlice.actions;

export default cardSlice.reducer;
