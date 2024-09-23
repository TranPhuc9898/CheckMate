import { ScrollView, TouchableOpacity } from "react-native";
import { useContext, useState } from "react";
import {
  Box,
  Container,
  Image,
  Card,
  Text,
  Button,
  Icon,
  Alert,
} from "components";
import styles from "./styles";

import { LocalizationContext } from "libs/context";
import ChooseReasonDeleteAccount from "./choose-reason-delete-account";

const DeleteAccountScreen = (props) => {
  const I18n = useContext(LocalizationContext);
  const [check, isCheck] = useState(true);

  const alertReasonDelete = () => {
    return Alert.alert.open({
      title: "DELETE_ACCOUNT.DELETE_ACCOUNT_TITLE_REASON",
      message: <ChooseReasonDeleteAccount />,
      actions: null,
    });
  };

  return (
    <Container>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        testID="scrollDeleteAccount"
      >
        <Card>
          {/* Image */}
          <Box
            center
            flex
          >
            <Image
              source={require("@images/delete-account.png")}
              resizeMode="contain"
              style={styles.image}
            />
            {/* TEXT */}
            <Box>
              <Box center>
                <Text
                  color="primary"
                  fontSize="l"
                  bold
                >
                  {I18n.t("DELETE_ACCOUNT.TEXT_TITLE_DELETE")}
                </Text>
              </Box>
              {/* CONDITION */}
              <Box style={styles.text}>
                <Box style={styles.paddingBox}>
                  <Text fontSize="l">{I18n.t("DELETE_ACCOUNT.TEXT_1")}</Text>
                </Box>
                <Box style={styles.paddingBox}>
                  <Text fontSize="l">{I18n.t("DELETE_ACCOUNT.TEXT_2")}</Text>
                </Box>
              </Box>
              <Box>
                <Box style={styles.paddingBox}>
                  <Text fontSize="l">
                    {I18n.t("DELETE_ACCOUNT.TEXT_CONFIRM")}
                  </Text>
                </Box>
                <Box style={styles.paddingBox}>
                  <Text
                    bold
                    fontSize="l"
                    color="secondary"
                  >
                    {I18n.t("DELETE_ACCOUNT.TEXT_TRANS_INFO")}
                  </Text>
                </Box>
                <Box style={styles.paddingBox2}>
                  <Text>{I18n.t("DELETE_ACCOUNT.TEXT_TRANS_INFO_1")}</Text>
                </Box>
                <Box style={styles.paddingBox}>
                  <Text
                    bold
                    fontSize="l"
                    color="secondary"
                  >
                    {I18n.t("DELETE_ACCOUNT.TEXT_PRIVILEGES_BENEFIT")}
                  </Text>
                </Box>
                <Box style={styles.paddingBox2}>
                  <Text>
                    {I18n.t("DELETE_ACCOUNT.TEXT_PRIVILEGES_BENEFIT_1")}
                  </Text>
                </Box>
                <Box style={styles.paddingBox}>
                  <Text
                    bold
                    fontSize="l"
                    color="secondary"
                  >
                    {I18n.t("DELETE_ACCOUNT.TEXT_INFO_ACCOUNT")}
                  </Text>
                </Box>
                <Box style={styles.paddingBox2}>
                  <Text>{I18n.t("DELETE_ACCOUNT.TEXT_INFO_ACCOUNT_1")}</Text>
                </Box>
                <Box style={styles.warningBox}>
                  <Box center>
                    <Icon
                      name="warning"
                      size="xl"
                      color="secondary1"
                    />
                  </Box>
                  <Box
                    flex
                    style={styles.warningText}
                  >
                    <Text bold>
                      {I18n.t("DELETE_ACCOUNT.TEXT_INFO_ACCOUNT_2")}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            row
            style={styles.textAgree}
          >
            <Box flex>
              <Text
                color="primary"
                fontSize="m"
                bold
              >
                {I18n.t("DELETE_ACCOUNT.TEXT_AGREE_DELETE_ACCOUNT")}
              </Text>
            </Box>

            {/* CheckBox */}
            <Box>
              <TouchableOpacity
                onPress={() => {
                  isCheck(!check);
                }}
              >
                <Box testID="btnAgree">
                  {check ? (
                    <Box style={styles.checkBox} />
                  ) : (
                    <Box
                      testID="btnAgree"
                      center
                      style={styles.checkBox2}
                    >
                      <Icon
                        name={"checked"}
                        color="white"
                      />
                    </Box>
                  )}
                </Box>
              </TouchableOpacity>
            </Box>
          </Box>
        </Card>
        {/* Button: Back */}
        <Button
          color={"primary"}
          testID="btnTurnBack"
          style={styles.boxContainer2}
          onPress={() => props.navigation?.goBack()}
        >
          <Text
            fontSize="l"
            bold
            color="white"
            style={styles.textLogout}
          >
            {I18n.t("DELETE_ACCOUNT.TURN_BACK")}
          </Text>
        </Button>
        {/* Button: Delete Account */}
        <Box style={styles.buttonDelete}>
          <Button
            disabled={check}
            disabledStyle={styles.btnDisabledStyle}
            testID="btnDeleteAccount2"
            style={styles.boxContainer2}
            onPress={() => {
              alertReasonDelete();
            }}
          >
            <Icon
              size="l"
              name="trash"
              color="white"
            />
            <Text
              fontSize="l"
              bold
              color="white"
              style={styles.textLogout}
            >
              {I18n.t("TAB_ACCOUNT.LABEL_DELETE_ACCOUNT")}
            </Text>
          </Button>
        </Box>
      </ScrollView>
    </Container>
  );
};

export default DeleteAccountScreen;
