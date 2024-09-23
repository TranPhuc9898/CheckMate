/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-11-15 13:48:00
 * @modify date 2022-11-15 13:48:00
 * @desc [Intro app]
 */

import React, { useContext, useRef } from "react";
import { Box, Button, Card, Container, Icon } from "@src/components";
import { LocalizationContext } from "@src/libs/context";
import { useDispatch } from "react-redux";
import Swiper from "react-native-swiper";
import styles from "./styles";
import { useState } from "react";
import FlexibleTime from "../components/flexible-time";
import HighIncome from "../components/high-income";
import CommunityAndReward from "../components/community-reward";
import { setFirstOpenApp } from "redux/slice/app-slice";

const IntroApp: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useDispatch();
  const I18n = useContext(LocalizationContext);
  const [index, setIndex] = useState(0);
  const swipeRef = useRef(null);

  const _checkTitle = () => {
    if (index === 2) {
      return I18n.t("INTRO_APP.BUTTON_START")
    }
    return I18n.t("DIALOG.BUTTON_NEXT")
  };

  const handleOnPress = () => {
    if (index === 2) {
      dispatch(setFirstOpenApp());
      return navigation.navigate("Registration");
    }
    swipeRef.current.scrollBy(1);
    return setIndex(index + 1);
  };

  return (
    <Container
      headerShow={true}
      style={styles.containerStyle}
    >
      <Card
        flex
        style={styles.cardStyle}
      >
        <Swiper
          ref={swipeRef}
          scrollEnabled={ false }
          automaticallyAdjustContentInsets={true}
          loop={false}
          activeDot={<Box style={styles.dotActive} />}
          onIndexChanged={(index) => setIndex(index)}
        >
          <FlexibleTime />
          <HighIncome />
          <CommunityAndReward />
        </Swiper>
        <Button
          title={_checkTitle()}
          onPress={handleOnPress}
          testID={"btnNextToLogin"}
          buttonStyle={styles.btnStyle}
        />
      </Card>
    </Container>
  );
};

export default IntroApp;
