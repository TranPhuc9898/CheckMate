/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-13 10:32:17
 * @modify date 2022-10-13 10:32:17
 * @desc [Show type house and duration]
 */

import { FC, useContext } from "react";
import { Alert, Box, Button, Icon, Image, Text } from "@src/components";
import { LocalizationContext } from "libs/context";
import { formatMoney, getTextWithLocale, navigateTo } from "libs/helper";
import { TouchableOpacity } from "react-native";
import { statusTask } from "libs/config";
import styles from "./styles";
import { ITypeHouseAndDuration } from ".";

const HouseKeepingDetail: FC<ITypeHouseAndDuration> = ({
  homeType,
  detail,
  status,
  description,
}) => {
  const I18n = useContext(LocalizationContext);

  const _handleOpenImage = (rooms = []) => {
    Alert.alert.open({
      title: "TASK_DETAIL.IMAGE_TITLE",
      message: (
        <Box
          row
          testID="btnOpenImageHouseKeeping"
        >
          {rooms.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.containerItemRoom}
              onPress={() => {
                Alert.alert.close();
                navigateTo("HostelDetail", { roomDetail: item });
              }}
            >
              <Image
                source={{
                  uri: item?.images ? item?.images[0] : null,
                }}
                resizeMode={"cover"}
                style={styles.imageBackground}
              />
              <Box margin="m">
                <Text
                  bold
                  color="primary"
                  style={styles.roomName}
                >
                  {I18n.t("TASK_DETAIL.NAME_ROOM", { t: item?.name })}
                </Text>
                <Text>
                  {I18n.t("TASK_DETAIL.AREA_ROOM", { t: item?.area })}
                </Text>
                {item?.note ? (
                  <Text>
                    {I18n.t("TASK_DETAIL.NOTE_ROOM", { t: item?.note })}
                  </Text>
                ) : null}
              </Box>
            </TouchableOpacity>
          ))}
        </Box>
      ),
    });
  };

  const _renderDescription = () => {
    if (status === statusTask.confirmed && description) {
      return (
        <Text
          testID="addressDescription"
          fontWeight="m"
          color="grey0"
        >
          {description}
        </Text>
      );
    }
    return null;
  };

  return (
    <Box>
      {/* Type house */}
      <Box
        row
        alignCenter
        style={styles.lineContainer}
      >
        <Box
          row
          alignCenter
        >
          <Icon
            name="home"
            color="primary"
          />
        </Box>
        <Box
          flex
          style={styles.contentCenter}
        >
          {_renderDescription()}
          <Text>{getTextWithLocale(homeType)}</Text>
          <Text style={styles.spacingText}>
            {I18n.t("TASK_DETAIL.HOSTEL_NAME")} {detail?.hostelName}
          </Text>
          <Text>
            {I18n.t("TASK_DETAIL.TOTAL_AREA", {
              t: formatMoney(detail?.totalArea),
            })}
          </Text>
        </Box>
        <Button
          size="lg"
          color={"secondary"}
          buttonStyle={styles.btnStyle}
          onPress={() => _handleOpenImage(detail?.rooms)}
          testID="btnDetailHostel"
        >
          <Icon name="image" />
        </Button>
      </Box>
    </Box>
  );
};

export default HouseKeepingDetail;
