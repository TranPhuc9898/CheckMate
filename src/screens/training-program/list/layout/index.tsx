import React, { useState } from "react";
import { ScrollView, InteractionManager } from "react-native";
import { Container, TransitionView } from "@src/components";
import getListAPI from "@src/apis/training-program/get-list";
import { IRespond, handleError } from "libs/helper";
import { setLoading } from "redux/slice/app-slice";
import { store } from "redux/store";

import Item from "./item";
import ComingSoon from "./coming-soon";

import styles from "./styles";

const TrainingProgramList = ({ navigation }) => {
  const [data, setData] = useState(null);

  const initData = async (withLoading = true) => {
    withLoading && (await store.dispatch(setLoading(true)));
    const respond: IRespond = await getListAPI();
    withLoading && (await store.dispatch(setLoading(false)));
    if (respond.isSuccess) {
      return setData(respond.data);
    }
    handleError(respond.error, () => navigation.goBack());
  };

  React.useEffect(() => {
    const interaction = InteractionManager.runAfterInteractions(() => {
      initData();
    });
    return () => {
      interaction.cancel();
    };
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      initData(false);
    });
    return unsubscribe;
  }, [navigation]);

  if (!data) {
    return <Container isFullScreen={false} />;
  }

  // Coming soon
  if (data && data.length === 0) {
    return (
      <Container isFullScreen={false}>
        <ComingSoon />
      </Container>
    );
  }

  return (
    <Container isFullScreen={false}>
      <ScrollView>
        {data.map((quiz, index) => (
          <TransitionView
            key={index}
            index={index}
          >
            <Item
              quiz={quiz}
              lesson={index + 1}
              navigation={navigation}
            />
          </TransitionView>
        ))}
      </ScrollView>
    </Container>
  );
};

export default TrainingProgramList;
