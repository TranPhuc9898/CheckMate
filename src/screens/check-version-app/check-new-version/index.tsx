import { Box, Card, Container, Image, Text } from "components";
import { LocalizationContext } from "libs/context";
import { openUrl } from "libs/helper";
import _ from "lodash";
import { useContext } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";

import styles from "./styles";

const deviceHeight = Dimensions.get("window").height;
const CheckNewVersion = () => {
  // Redux
  const { newVersionInfo } = useSelector((state: RootState) => state.app);
  const link = _.get(newVersionInfo, "newVersion.link", "");
  const I18n = useContext(LocalizationContext);
  return (
    <Container
      headerTitle={I18n.t("NEW_VERSION_APP.TITLE_BUTTON_UPDATE_VERSION")}
      isFullScreen
    >
      <Card flex>
        <Box flex>
          <Box
            center
            flex
          >
            <Image
              source={require("@images/force.png")}
              style={styles.backgroundImageStyle}
            />
          </Box>
          <Box
            flex
            style={{ paddingTop: deviceHeight * 0.1 }}
          >
            <Text
              fontSize="xl"
              color="primary"
              style={{ textAlign: "center" }}
              testID="textNewversionText"
            >
              {I18n.t("NEW_VERSION_APP.CONTENT_UPDATE_APP")}
            </Text>
          </Box>
          {/* End content */}
          <Box>
            <TouchableOpacity
              style={styles.pressLink}
              onPress={() => {
                openUrl(link);
              }}
            >
              <Box center>
                <Text
                  bold
                  color="white"
                  testID="btnNewVersionUpdate"
                >
                  {I18n.t("NEW_VERSION_APP.NEW_VERSION_BUTTON")}
                </Text>
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default CheckNewVersion;
