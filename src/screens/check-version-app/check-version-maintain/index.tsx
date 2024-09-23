import { Box, Card, Container, Image, Text } from "components";
import { LocalizationContext } from "libs/context";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";
import styles from "./styles";

const CheckVersionMaintain = () => {
  const I18n = useContext(LocalizationContext);
  const { newVersionInfo } = useSelector((state: RootState) => state.app);
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
              source={require("@images/maintain.png")}
              style={styles.backgroundImageStyle}
            />
          </Box>
          <Box flex>
            <Text
              fontSize="xl"
              color="primary"
              style={{ textAlign: "center" }}
              testID="textMaintain"
            >
              {I18n.t("NEW_VERSION_APP.MAINTENANCE_APP_TITLE")}
            </Text>
          </Box>
          {/* End content */}
        </Box>
      </Card>
    </Container>
  );
};

export default CheckVersionMaintain;
