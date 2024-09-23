import React, { useState } from "react";
import { InteractionManager } from "react-native";
import _ from "lodash";
import { Container, TransitionView } from "@src/components";
import getDetailAPI from "@src/apis/training-program/get-detail";
import { IRespond, handleError } from "libs/helper";
import { setLoading } from "redux/slice/app-slice";
import { store } from "redux/store";

import ItemTraining from "./item-training";
import ItemTest from "./item-test";

const TrainingProgramDetail = ({ navigation, route }) => {
  const [data, setData] = useState(null);
  const trainingProgramId = route?.params?.trainingProgramId;

  /**
   *
   * @param callback action sau khi gọi api thành công
   * @returns
   */
  const initData = async (callback: (e: any) => void, withLoading = true) => {
    withLoading && (await store.dispatch(setLoading(true)));
    const respond: IRespond = await getDetailAPI(trainingProgramId);
    withLoading && (await store.dispatch(setLoading(false)));
    // Success
    if (respond.isSuccess) {
      setData(respond.data);
      callback && callback(respond.data);
      return;
    }
    // Error
    handleError(respond.error, () => navigation.goBack());
    return;
  };

  React.useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      initData(null);
    });
    return () => {
      interactionPromise.cancel();
    };
  }, []);

  if (!data) {
    return <Container isFullScreen={false} />;
  }

  return (
    <Container isFullScreen={false}>
      <TransitionView
        index={1}
        animation="fadeInLeft"
      >
        <ItemTraining
          navigation={navigation}
          data={data}
          callback={initData}
        />
      </TransitionView>
      <TransitionView
        index={2}
        animation="fadeInLeft"
      >
        <ItemTest
          navigation={navigation}
          data={data}
          callback={initData}
        />
      </TransitionView>
    </Container>
  );
};

export default TrainingProgramDetail;
