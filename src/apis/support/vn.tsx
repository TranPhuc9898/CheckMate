import { fetchAPI } from "@src/libs/helper";
const getTaskerSupportInfo = async () => {
    return await fetchAPI("v3/api-tasker-vn/get-tasker-support-info");
};
export default getTaskerSupportInfo;
