import Config from "react-native-config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import { modeConfig } from "libs/config";
import { combineReducers } from "redux";

// import reducer here
import rootReducer, { RootState } from "../slice";
import { blacklist, transforms, whitelist } from "./persist-transforms-filter";

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

// persits config
const persistConfig = {
  key: "persist",
  storage: AsyncStorage,
  transforms: transforms,
  blacklist: blacklist,
  whitelist: whitelist,
  stateReconciler: autoMergeLevel2, // nếu không có thì sau khi load data lại reducer chỉ hiện những field được filter
};

export const reducers = combineReducers(rootReducer);

const persistedReducer = persistReducer<RootState>(persistConfig, reducers);

// logger config, only open when debug with Chrome
const loggerMiddleware = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
});

// store config
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(loggerMiddleware),
  devTools: Config.MODE === modeConfig.dev,
});

// persist
export const persistor = persistStore(store);
