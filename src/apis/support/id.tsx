import { fetchAPI } from "@src/libs/helper";
const getTaskerSupportInfoAPI = async () => {
    return await fetchAPI("v3/api-tasker-indo/get-tasker-support-info");
};
export default getTaskerSupportInfoAPI;
