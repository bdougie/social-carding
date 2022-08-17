import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import CardSlice from "./CardSlice";
import LoadingSlice from "./LoadingSlice";

export const store = configureStore({
  reducer: {
    loading: LoadingSlice,
    card: CardSlice,
  },
});
