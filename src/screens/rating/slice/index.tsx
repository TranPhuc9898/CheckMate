import { createSlice } from "@reduxjs/toolkit";
import cancelRatingAPI, { ICancelRating } from "apis/rating/cancel-rating";
import ratingAskerAPI, { IRatingAsker } from "apis/rating/partner-rating";

import { setLoading } from "redux/slice/app-slice";
import { store } from "redux/store";

interface IRatingAskerReducer {
  isRated: boolean;
}
const initialState: IRatingAskerReducer = {
  isRated: false,
};

export const slice = createSlice({
  name: "ratingAsker",
  initialState: initialState,
  reducers: {
    setIsRated: (state, action) => {
      // trả về 1 list data monthlyReward
      state.isRated = action.payload;
    },
    resetState: () => initialState,
  },
});

export default slice.reducer;
export const { setIsRated, resetState } = slice.actions;

// Tasker cancel rating
export const cancelRating = (params: ICancelRating) => async () => {
  const { isRated } = store.getState().ratingAsker;
  // Tasker rated -> return
  if (isRated) {
    return;
  }
  // Tasker chưa rating -> gọi cancel rating
  // Loading
  await store.dispatch(setLoading(true));
  // Call ap cancel rating
  await cancelRatingAPI(params);
  // Hide loading
  await store.dispatch(setLoading(false));
  // Set isRated true
  setIsRated(true);
};

// Rating asker
export const ratingAsker = (params: IRatingAsker) => async () => {
  // Loading
  await store.dispatch(setLoading(true));
  // Call api rating asker
  await ratingAskerAPI(params);
  // Hide loading
  await store.dispatch(setLoading(false));
  // Set isRated true
  setIsRated(true);
};
