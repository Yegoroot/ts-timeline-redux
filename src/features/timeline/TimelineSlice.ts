import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { RootState } from "../../app/store";
import { Data } from "../../utils/axios";

export interface TimelineState {
  data: Data;
  status: "responsed" | "loading" | "failed";
}

const initialState: TimelineState = {
  data: {
    events: [],
    intervalDates: {
      dateEnd: "",
      dateStart: "",
    },
  },
  status: "responsed",
};

// Обработка происходит в axios interception
export const getTimeline = createAsyncThunk(
  "Timeline/fetchEvents",
  async () => {
    const response = await axios.get("/events").then((res) => res);
    return response.data;
  }
);

export const TimelineSlice = createSlice({
  name: "Timeline",
  initialState,
  reducers: {
    // someAction: (state) => {
    //   // под капотом Immer библиотека и поэтому она не мутирует данные а образует новое состояние
    //   state.status = 'failed';
    // },
  },

  // обрабатываем thunk
  extraReducers: (builder) => {
    builder
      .addCase(getTimeline.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTimeline.fulfilled, (state, action) => {
        state.status = "responsed";
        state.data = action.payload;
      });
  },
});

export const selectTimeline = (state: RootState) => state.Timeline;

export default TimelineSlice.reducer;
