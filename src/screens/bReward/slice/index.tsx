import { createSlice } from "@reduxjs/toolkit";
import getListBRewardsAPI, {
  IParamsGetListRewards,
} from "apis/benefit/get-list-rewards";
import { getUserIdGlobal, handleError, IRespond } from "libs/helper";
import { setLoading } from "redux/slice/app-slice";
import { store } from "redux/store";
import _ from "lodash";

const MIN_SEARCH_TEXT = 5;

interface BRewardState {
  filterBy?: any;
  sortBy?: "LASTEST" | "POINT_DECREASE" | "POINT_INCREASE";
  limit?: number;
  page?: number;
  incentivesData?: any;
  isGetAllData?: boolean;
  listSearchOfReward?: any;
}

const initialState: BRewardState = {
  filterBy: {},
  sortBy: "LASTEST",
  limit: 5,
  page: 1,
  incentivesData: [],
  isGetAllData: false,
  listSearchOfReward: [],
};

const slice = createSlice({
  name: "userReward",
  initialState: initialState,
  reducers: {
    // Set isGetAllData
    setGetAllData: (state, action) => {
      state.isGetAllData = action.payload;
    },
    setPageIncentive: (state, action) => {
      state.page = action.payload;
    },
    // Reset data incentive
    resetIncentiveState: (state) => {
      (state.filterBy = {}),
        (state.sortBy = "LASTEST"),
        (state.limit = 5),
        (state.page = 1),
        (state.incentivesData = []),
        (state.isGetAllData = false);
    },
    setIncentivesData: (state, action) => {
      state.incentivesData = action.payload;
    },
    setFilterBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setListSearchOfReward: (state, action) => {
      state.listSearchOfReward = action.payload;
    },
    resetState: () => initialState,
  },
});

export default slice.reducer;

export const {
  setSortBy,
  setFilterBy,
  setGetAllData,
  setPageIncentive,
  resetIncentiveState,
  setIncentivesData,
  setListSearchOfReward,
  resetState
} = slice.actions;

// Get list reward by params
export const onGetListRewards = (filter?: any) => async (dispatch: any) => {
  const { isGetAllData, incentivesData, limit, page, sortBy, filterBy } =
    store.getState().userReward;
  // Check data is full, no call api, avoid spam server
  if (isGetAllData) {
    return null;
  }
  const dataFilter: any = {};
  if (filter?.type) {
    dataFilter.type = filter?.type;
  }
  if (filter?.searchText) {
    dataFilter.searchText = filter?.searchText;
  }
  if (filter?.categoryName) {
    dataFilter["categoryName"] = filter?.categoryName;
  }
  // Init params
  const params: IParamsGetListRewards = {
    taskerId: getUserIdGlobal(),
    filterBy: { ...filterBy, ...dataFilter },
    sortBy: sortBy,
    page: 1,
    limit: 50,
  };
  // Call api get list bReward
  const result: IRespond = await getListBRewardsAPI(params);
  // Hide loading
  if (!result.isSuccess) {
    // Handle error
    return handleError(result?.error);
  }
  // Get data from api
  const resultData = _.get(result, "data", []);
  // Merge new incentive to incentiveData
  const customIncentivesData = [...incentivesData, ...resultData];

  // Data is full, set incentive to reducer
  if (
    resultData.length === 0 ||
    resultData.length < limit ||
    customIncentivesData.length < limit
  ) {
    dispatch(setLoading(false));
    dispatch(setGetAllData(true));
  }

  // After each data retrieval, the page will be added 1
  dispatch(setPageIncentive(page + 1));

  // Set data new data incentive if success
  dispatch(setIncentivesData(customIncentivesData));
};

// Set List Search Of Reward
export const cleanSearchText = (searchText) => async (dispatch: any) => {
  if (!searchText) return;
  const { listSearchOfReward } = store.getState().userReward;
  const cloneListSearchText = _.cloneDeep(listSearchOfReward);

  // Trường hợp bị trùng search text, sẽ xoá vị trí cũ và thêm search text lên mới nhất
  const indexSearchText = cloneListSearchText.indexOf(searchText);
  if (indexSearchText >= 0) {
    cloneListSearchText.splice(indexSearchText, 1);
  }
  dispatch(setListSearchOfReward(cloneListSearchText));
};

/**
 * SearchText
 * @returns
 */
export const onSearchText =
  (searchText) => async (dispatch: any, getState: any) => {
    // Nộp bài, chờ alert confirmed đóng
    await dispatch(resetIncentiveState());
    if (!searchText) return;
    const { listSearchOfReward } = store.getState().userReward;
    const cloneListSearchText = _.cloneDeep(listSearchOfReward);

    // Trường hợp bị trùng search text, sẽ xoá vị trí cũ và thêm search text lên mới nhất
    const indexSearchText = cloneListSearchText.indexOf(searchText);
    if (indexSearchText >= 0) {
      cloneListSearchText.splice(indexSearchText, 1);
    }

    // Thêm search text vào mảng
    cloneListSearchText.unshift(searchText);

    // Xoá những search text đã cũ, limit 5
    if (cloneListSearchText.length > MIN_SEARCH_TEXT) {
      cloneListSearchText.pop();
    }
    await dispatch(setListSearchOfReward(cloneListSearchText));
    await dispatch(onGetListRewards({ searchText: searchText }));
  };
