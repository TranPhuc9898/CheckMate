import { createSlice } from "@reduxjs/toolkit";

interface INotifySocket {
  isReady: boolean;
}

const initialState: INotifySocket = {
  isReady: false,
};

const slice = createSlice({
  name: "notifySocket",
  initialState: initialState,
  reducers: {
    // Set status socket
    setIsReady: (state, action) => {
      state.isReady = action.payload;
    },
    resetState: () => initialState,
  },
});

export default slice.reducer;

export const { setIsReady, resetState } = slice.actions;
