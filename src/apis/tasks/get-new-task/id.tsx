import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";
import { IGetNewTask } from ".";

const getPostTask = async (option: IGetNewTask) => {
  if (!getUserIdGlobal()) {
    return;
  }
  let params: any = {
    userId: getUserIdGlobal(),
  };
  if (option?.sortBy) {
    params.sortBy = option?.sortBy;
  }
  if (option?.isTaskerWorkingPlaces) {
    params.filterBy = {
      isTaskerWorkingPlaces: option.isTaskerWorkingPlaces
    };
  }
  if (option?.limit) {
    params.limit = option.limit;
  }
  if (option?.page) {
    params.page = option.page;
  }
  return await fetchAPI("v3/api-tasker-indo/get-posted-waiting-tasks", params);
};
export default getPostTask;
