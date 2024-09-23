import _ from "lodash";
import styles, { ITEM_WIDTH, SLIDER_WIDTH } from "./styles";
import { Box } from "components";
import { RootState } from "redux/slice";
import { InteractionManager, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import HeaderProcedure from "./components/header";
import StepActiveAccount from "./components/steps";
import ActiveAccount from "./components/steps/layout/active-account";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { store } from "redux/store";
import { getTrainingStep } from "redux/slice/app-slice";
import Carousel from "react-native-snap-carousel";

export const statusStep = {
  lock: "LOCK",
  open: "OPEN",
};

export const typeStep = {
  failed: "FAILED",
  processing: "PROCESSING",
  pass: "PASS",
};

export const stepName = {
  step1: "Admission Test",
  step2: "Basic Training",
  step3: "Active Account",
};

const ProcedureActiveAccount = () => {
  const { trainingStep } = useSelector((state: RootState) => state.app);
  const isFocused = useIsFocused();
  const scrollRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const interaction = InteractionManager.runAfterInteractions(() => {
      // Reset get data when destroy
      store.dispatch(getTrainingStep());
    });
    // Cleanup function
    return () => {
      interaction.cancel();
    };
  }, [isFocused]);

  const _checkCurrentStep = () => {
    // Nếu step cuối pass thì currentStep = length + 1
    if (_.last(trainingStep)?.data?.status === typeStep.pass) {
      return trainingStep.length + 1;
    }
    // Tìm phần tử lock đầu tiên
    const positionInActiveStep = trainingStep.findIndex(
      (item) => item.permission === statusStep.lock
    );
    // Nếu không có phần tử lock thì currentStep = length
    if (positionInActiveStep === -1) {
      return trainingStep.length;
    }
    // Nếu có phần tử lock thì currentStep chính vị trí đó
    return positionInActiveStep;
  };

  const _checkActiveAccount = () => {
    const finalStep = _.last(trainingStep);
    return Boolean(finalStep?.data?.status === typeStep.pass);
  };

  const _scrollToTop = () => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    }, 300);
  };

  const _renderItem = ({ item, index }) => {
    return (
      <StepActiveAccount
        name={item.name}
        data={item.data}
        key={"step" + index}
        numberOfStep={index + 1}
        callback={_scrollToTop}
        permission={item.permission}
      />
    );
  };

  const _renderContent = () => {
    if (trainingStep.length === 1) {
      return (
        <Box
          flex
          style={styles.containerActiveAccount}
        >
          {trainingStep.map((item, index) => (
            <ActiveAccount
              name={item.name}
              data={item.data}
              key={"step" + index}
              callback={_scrollToTop}
              numberOfStep={index + 1}
              showOnlyActiveAccount={true}
              permission={item.permission}
            />
          ))}
        </Box>
      );
    }
    return (
      <Box
        flex
        testID="scrollHorizontal"
      >
        <Carousel
          ref={carouselRef}
          data={trainingStep}
          renderItem={_renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          layout={"default"}
          activeSlideAlignment={"start"}
          firstItem={_checkCurrentStep() - 1}
          containerCustomStyle={styles.containerCarousel}
          slideStyle={styles.slideStyle}
          hasParallaxImages={true}
        />
      </Box>
    );
  };

  if (_.isEmpty(trainingStep)) return null;

  return (
    <ScrollView
      ref={scrollRef}
      testID="scrollVertical"
    >
      <HeaderProcedure
        totalStep={trainingStep.length || 1}
        currentStep={_checkCurrentStep() - 1 || 0}
        isDone={_checkActiveAccount()}
      />
      {_renderContent()}
    </ScrollView>
  );
};
export default ProcedureActiveAccount;
