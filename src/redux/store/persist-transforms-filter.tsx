/**
 * Nơi để quyết định xem những reducer nào mới được quyền persisted
 */
import { createFilter } from "redux-persist-transform-filter";

interface Filter {
  reducer: string;
  fields: Array<string>; // field được phép persisted trong reducer
}

// điền tên của reducer và field của reducer muốn persisted ở đây
const filter: Array<Filter> = [
  {
    reducer: "app",
    fields: ["isoCode", "locale", "settingSystem", "user", "isFirstOpenApp", "environmentKey", "chooseSighUpOrLogin", "userTracking", "isShowModalSeeMoreJourney"],
  },
  {
    reducer: "myTasks",
    fields: ["listDataTask"],
  },
  {
    reducer: "newTasks",
    fields: ["isTaskerWorkingPlaces", "filterBy"],
  },
  {
    reducer: "trainingInput",
    fields: ["dataQuiz", "dataAnswers", "isLimited"],
  },
  {
    reducer: "userReward",
    fields: ["listSearchOfReward"],
  },
];

// Không được phép
export const blacklist: Array<string> = [];

// Được phép
export const whitelist: Array<string> = filter.map((e) => e.reducer);

// Lọc
export const transforms: Array<any> = filter.map((e) =>
  createFilter(e.reducer, e.fields)
);
