import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MyFormValues } from "~pages/mortgage-calculator/ui";
import { initialValues } from "../constants";

interface MortgageState {
  status: "idle" | "loading" | "succeeded" | "failed";
  data: MyFormValues;
}

const initialState: MortgageState = {
  status: "idle",
  data: initialValues,
};

export const submitMortgage = createAsyncThunk(
  "mortgage/submitMortgage",
  async (formData: MyFormValues) => {
    return new Promise<MyFormValues>((resolve) => {
      setTimeout(() => {
        resolve(formData);
      }, 1000);
    });
  },
);

const mortgageSlice = createSlice({
  name: "mortgage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitMortgage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitMortgage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(submitMortgage.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default mortgageSlice.reducer;
