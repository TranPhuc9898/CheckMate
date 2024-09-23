import React, { FC } from "react";
import { LocalizationContext } from "@src/libs/context";
import { Box, Button, Card, Container, Image, Text } from "@src/components";
import styles from "./styles";
import { colors } from "libs/theme";
import { store } from "redux/store";
import { setSighUpOrLogin } from "redux/slice/app-slice";

interface ISignUpAndLoginScreen {
  navigation?: any;
}

const SignUpAndLoginScreen: FC<ISignUpAndLoginScreen> = ({ navigation }) => {
  const I18n = React.useContext(LocalizationContext);

  return (
    <Container headerShow={true}>
      <Card
        flex
        style={styles.container}
      >
        <Box
          flex
          center
        >
          <Image
            source={require("assets/images/intro-app/login-or-register.png")}
            style={styles.imageStyle}
          />
          <Text
            center
            color="primary"
            variant="h2"
            style={styles.containerImage}
          >
            {I18n.t("INTRO_APP.START_WORKING")}
          </Text>
        </Box>
        <Button
          onPress={() => {
            store.dispatch(setSighUpOrLogin());
            navigation.navigate("Register");
          }}
          title={I18n.t("REGISTER.TITLE_REGISTER")}
          color={colors.primary}
        />
        <Box
          style={styles.containerMid}
        >
          <Box
            center
            style={styles.boxTxt}
          >
            <Text
              center
              fontSize="m"
              color="grey1"
              fontWeight="m"
              style={styles.txtStyles}
            >
              {I18n.t("INTRO_APP.ALREADY_ACCOUNT")}
            </Text>
          </Box>
          <Box style={styles.containerDivider} />
        </Box>
          <Button
            onPress={() => {
              store.dispatch(setSighUpOrLogin());
              navigation.popToTop();
              navigation.replace("Login");
            }}
            title={I18n.t("LOGIN.TITLE_LOGIN")}
            color={colors.white}
            titleStyle={styles.titleBtnLogin}
            buttonStyle={styles.btnLogin}
          />
      </Card>
    </Container>
  );
};

export default SignUpAndLoginScreen;
