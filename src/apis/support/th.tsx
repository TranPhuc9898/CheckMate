import { fetchAPI } from "@src/libs/helper";
const getTaskerSupportInfo = async () => {
    return await fetchAPI("v3/api-tasker-th/get-tasker-support-info");
};
export default getTaskerSupportInfo;
