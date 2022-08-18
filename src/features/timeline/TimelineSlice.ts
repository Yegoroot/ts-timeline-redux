import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { RootState } from "../../app/store";
import { Data, data } from "./TimelineData";

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
  status: "loading",
};

// Данные получаем таким образом (такое было условие в задаче)
export const getTimeline = createAsyncThunk(
  "Timeline/fetchEvents",
  async () =>
    await axios
      .get("//anyurl.com/events")
      .then((res) => res.data)
      .catch((err) => data)
);

export const TimelineSlice = createSlice({
  name: "Timeline",
  initialState,
  reducers: {},

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
