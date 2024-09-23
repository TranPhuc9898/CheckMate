import { useEffect, useState } from "react";
// API
import getKitsAndChemicals from "apis/kitsandchemicals";

// Component
import { Box } from "components";
import RenderKitsChemicals from "../render-kits-chemicals";

// Redux
import { setLoading } from "redux/slice/app-slice";

// Lib
import { handleError, IRespond } from "libs/helper";
import { store } from "redux/store";

const GetKits = () => {
  // Hook
  const [respondKits, setRespondKits] = useState<any>();

  // Call API
  const initData = async () => {
    // Call Api SetLoading True
    await store.dispatch(setLoading(true));
    const respond: IRespond = await getKitsAndChemicals();
    // setLoading false
    await store.dispatch(setLoading(false));
    if (respond?.isSuccess) {
      return setRespondKits(respond?.data?.kitsAndChemicals?.kits);
    }
    return handleError(respond?.error);
  };
  // Init Data
  useEffect(() => {
    initData();
  }, []);

  return (
    <Box>
      {/* Render Data Kits*/}
      <RenderKitsChemicals data={respondKits} />
    </Box>
  );
};
export default GetKits;
