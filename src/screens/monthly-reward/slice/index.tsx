import { createSlice } from "@reduxjs/toolkit";
import getMonthLyRewardAPI from "apis/reward/get-monthly-reward";
import viewMonthlyRewardAPI from "apis/reward/view-monthly-reward";
import { USER_STATUS_UNVERIFIED } from "libs/constants";
import { IRespond } from "libs/helper";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";

import { setLoading } from "redux/slice/app-slice";
import { store } from "redux/store";

interface IMonthlyRewardState {
  data: any;
}
const initialState: IMonthlyRewardState = {
  data: undefined,
};

export const slice = createSlice({
  name: "monthlyReward",
  initialState: initialState,
  reducers: {
    monthlyRewardSuccess: (state, action) => {
      // trả về 1 list data monthlyReward
      state.data = action.payload;
    },
    resetState: () => initialState,
  },
});

export default slice.reducer;
export const { monthlyRewardSuccess, resetState } = slice.actions;

// API getMonthLyRewardAPI
export const getMonthlyReward = () => async (dispatch) => {
  const {user} = store.getState().app;
  if (user?.status === USER_STATUS_UNVERIFIED) {
    return null;
  }
  // Loading
  await store.dispatch(setLoading(true));
  const respond: IRespond = await getMonthLyRewardAPI();
  await store.dispatch(setLoading(false));
  if (respond?.isSuccess) {
    return dispatch(monthlyRewardSuccess(respond?.data));
  }
};
// API viewMonthlyReward
export const viewMonthlyReward = async (dispatch) => {
  // lấy data từ montlyReward dể lấy id truyền xuống cho api viewMonthlyReward
  const getMonthlyReward = store?.getState()?.getMonthlyReward?.data;
  const params = {
    rewardId: getMonthlyReward?.rewardId,
  };
  // truyển RewardId vào
  return await viewMonthlyRewardAPI(params);
};
