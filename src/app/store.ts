import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import TimelineReducer from "../features/timeline/TimelineSlice";

export const store = configureStore({
  reducer: {
    Timeline: TimelineReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
