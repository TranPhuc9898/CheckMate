import { createSlice } from "@reduxjs/toolkit";

interface ITasksSocket {
  newTasksSocket: any;
  myTasksSocket: any;
  isReady: boolean;
}

const initialState: ITasksSocket = {
  newTasksSocket: {},
  myTasksSocket: {},
  isReady: false,
};

const slice = createSlice({
  name: "tasksSocket",
  initialState: initialState,
  reducers: {
    // Set list task posted
    setNewTasksSocket: (state, action) => {
      state.newTasksSocket = action.payload;
    },
    // Set list task waiting
    setMyTasksSocket: (state, action) => {
      state.myTasksSocket = action.payload;
    },
    // Set status socket
    setIsReady: (state, action) => {
      state.isReady = action.payload;
    },
    resetState: () => initialState,
  },
});

export default slice.reducer;

export const { setNewTasksSocket, setMyTasksSocket, setIsReady, resetState } = slice.actions;
