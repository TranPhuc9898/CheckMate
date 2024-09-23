import { FC, useContext } from "react";
import { LocalizationContext } from "libs/context";
import { openModalAlert, setLoading } from "redux/slice/app-slice";
import getRewardAPI from "apis/journey/level-up-tasker-journey";
import { IRespond, handleError, popToTop } from "libs/helper";
import { Button } from "components";
import { store } from "redux/store";
import styles from "./styles";
import { typeModalWebSocket } from "libs/config";
import { getUserInfo } from "redux/slice/app-slice";

interface IGetReward {
  isCanGetReward?: boolean;
  initDataJourney?: () => void;
}

const GetReward: FC<IGetReward> = ({ isCanGetReward, initDataJourney }) => {
  const I18n = useContext(LocalizationContext);

  const _handleGetReward = async () => {
    await store.dispatch(setLoading(true));
    const result: IRespond = await getRewardAPI();
    await store.dispatch(setLoading(false));
    if (result?.isSuccess) {
      // Tự động scroll tới level tiếp theo
      await initDataJourney();
      // Lấy lại thông tin user
      await store.dispatch(getUserInfo());
      // Khi scroll xong -> mở modal phần thưởng
      setTimeout(() => {
        store.dispatch(openModalAlert({
          name: typeModalWebSocket.levelUp,
          data: result?.data
        }));
      }, 2000);
      return; 
    }
    // Handle error
    return handleError(result?.error, popToTop);
  };

  if (!isCanGetReward) {
    return null;
  }

  return (
    <Button
      testID="btn_rewardJourney"
      onPress={_handleGetReward}
      containerStyle={styles.containerButton}
      title={I18n.t("JOURNEY.BUTTON_GET_REWARD")}
    />
  )
}
export default GetReward;