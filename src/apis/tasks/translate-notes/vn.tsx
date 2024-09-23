import { fetchAPI } from "@src/libs/helper";
import { IParamTranslateNotes } from ".";

const getNotesTranslated = async (params: IParamTranslateNotes) => {
  return await fetchAPI('v3/api-tasker-vn/translate-task-note', params);
}
export default getNotesTranslated;