/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-15 10:26:24
 * @modify date 2022-10-15 10:26:24
 * @desc [Render button task posted]
 */

import { FC, useContext, useState } from "react";
import { LocalizationContext } from "libs/context";
import moment from "moment";
import ButtonTaskFinished from "./task-finished";
import ButtonTaskNotStarted from "./task-not-started";
import { Button } from "components";
import styles from "../../../../styles";
import beginWorkAPI, { IParamBeginWork } from "apis/tasks/begin-work";
import { setLoading } from "redux/slice/app-slice";
import {
  getCurrentLocation,
  getUserIdGlobal,
  handleError,
  IRespond,
} from "libs/helper";

interface ILocation {
  longitude: any;
  latitude: any;
}

interface ICurrentLocation {
  coords?: ILocation;
}

interface IActionButtonTaskConfirmed {
  taskId: string;
  date: Date;
  duration: number;
  isStarted: boolean;
  navigation: any;
}

const ActionButtonTaskConfirmed: FC<IActionButtonTaskConfirmed> = ({
  taskId,
  date,
  duration,
  isStarted,
  navigation,
}) => {
  const I18n = useContext(LocalizationContext);
  const [location, setLocation] = useState<ILocation>();
  const [disable, setDisable] = useState(false);

  const _getLocation = async () => {
    const currentLocation: ICurrentLocation = await getCurrentLocation();
    if (currentLocation) {
      const local = {
        longitude: currentLocation?.coords?.longitude,
        latitude: currentLocation?.coords?.latitude,
      };
      setLocation(local);
      return local;
    }
  };

  const _onBeginWork = async () => {
    await setDisable(true);

    // Get location
    const local = await _getLocation();

    // Show loading
    setLoading(true);

    // Init param beginWord
    const param: IParamBeginWork = {
      taskId: taskId,
      userId: getUserIdGlobal(),
      lat: location?.latitude || local?.latitude,
      lng: location?.longitude || local?.longitude,
    };

    // Call api beginWork task
    const result: IRespond = await beginWorkAPI(param);

    // Show loading
    setLoading(false);

    // Success
    if (result?.isSuccess) {
      return navigation.popToTop();
    }
    // Throw error
    return handleError(result?.error);
  };

  // Task stared
  if (
    moment(date).isSameOrBefore() &&
    moment(date).add(duration, "h").isSameOrAfter() &&
    isStarted
  ) {
    return null;
  }

  // Task not yet started
  if (moment(date).isSameOrAfter()) {
    return <ButtonTaskNotStarted date={date} />;
  }

/* -------- Tạm thời chưa áp dụng điều kiện isStarted. Sẽ bổ sung sau ------- */

  // Task finish
  if (moment(date).add(duration, "h").isSameOrBefore()) {
    return (
      <ButtonTaskFinished
        taskId={taskId}
        navigation={navigation}
      />
    );
  }

  if (moment(date).add(duration, "h").isSameOrBefore()) {
    return (
      <Button
        size="lg"
        disabled={true}
        testID="btnBeginWork"
        buttonStyle={styles.btnBeginWork}
        title={I18n.t("TASK_DETAIL.BEGIN_WORK")}
      />
    );
  }

  return (
    <Button
      size="lg"
      disabled={disable}
      testID="btnBeginWork"
      onPress={_onBeginWork}
      buttonStyle={styles.btnBeginWork}
      title={I18n.t("TASK_DETAIL.BEGIN_WORK")}
    />
  );
};

export default ActionButtonTaskConfirmed;
