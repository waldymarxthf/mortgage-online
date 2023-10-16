import { configureStore } from "@reduxjs/toolkit";
import mortgageReducer from "~pages/mortgage-calculator/model/mortgageSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    mortgage: mortgageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
