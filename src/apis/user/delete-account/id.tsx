import { fetchAPI } from "@src/libs/helper";
import { IDeleteAccountAPI } from "./index";

const DeleteAccountAPI = async (params: IDeleteAccountAPI) => {
  return fetchAPI("v3/user-tasker-indo/delete-tasker", params);
};

export default DeleteAccountAPI;
