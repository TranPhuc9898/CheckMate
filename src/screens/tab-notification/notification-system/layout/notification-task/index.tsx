import { useContext } from "react";
import { TouchableOpacity } from "react-native";
// Lib
import _ from "lodash";
import { RectButton, Swipeable } from "react-native-gesture-handler";
// Component
import deleteNotificationAPI from "apis/notification/delete-notification";
import { Alert, Box, Card, Divider, Icon, Image, Text } from "components";
import { LocalizationContext } from "libs/context";
import {
  IRespond,
  formatDate,
  handleError,
  handleNotification,
} from "libs/helper";
import { spacing } from "libs/theme";
// styles
import styles from "./styles";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";
import { store } from "redux/store";
import { getListNotificationTask, setListNotification } from "screens/tab-notification/slice";
import readNotificationAPI, { IParamNotificationIsRead } from "apis/notification/read-notification";

const IMAGE_EMPTY = require("@src/assets/images/thumbnail-noti-default.png");

const NotificationTask = () => {
  const { listNotificationTask } = useSelector(
    (state: RootState) => state.notification
  );
  const I18n = useContext(LocalizationContext);
  // check row được chọn
  let row: Array<any> = [];
  let prevOpenedRow: any;

  // Function to get Id to delete
  const _deleteNotification = async (id: string) => {
    const respondId: IRespond = await deleteNotificationAPI(id);
    if (respondId?.isSuccess) {
      return await store.dispatch(getListNotificationTask());
    }
    return handleError(respondId?.error);
  };

  const _onPressItemNotification = async (notify: any) => {
    // Điều hướng thông báo
    handleNotification(notify);
    // Nếu không có _id hoặc đã đọc rồi-> kết thúc
    if (!notify?._id || notify?.isRead) {
      return;
    }
    // Kiểm tra vị trí thông báo ở local
    const index = listNotificationTask?.findIndex((item) => item?._id === notify?._id);
    // Đánh dấu đã đọc
    if (index !== -1) {
      let notificationTaskClone = _.cloneDeep(listNotificationTask);
      notificationTaskClone[index].isRead = true;
      store.dispatch(setListNotification(notificationTaskClone));
    }
    const params: IParamNotificationIsRead = {
      notificationId: notify?._id,
    };
    // Gọi api đánh dấu đã đọc
    await readNotificationAPI(params.notificationId);
    return;
  }

  // check row thứ mấy được xoá, nếu hàng đó được xoá thì sẽ render lại row trong mảng
  const closeRow = (index) => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };

  const _handleDeleteNotification = (idNotify: string) => {
    Alert.alert.open(
      {
        title: "NOTIFICATION.TAB_NOTIFICATION",
        message: ["NOTIFICATION.NOTIFICATION_MESSAGE"],
        actions: [
          {
            text: "DIALOG.BUTTON_ACCEPT",
            onPress: () => {
              _deleteNotification(idNotify);
              Alert.alert.close();
            },
          },
          {
            text: "DIALOG.BUTTON_CLOSE",
            style: "cancel",
          },
        ],
      },
      true
    );
  };

  // Show thumbnail when have uri, if not show logo_bTaskee
  const _renderThumbnail = (uri, isRead) => {
    if (uri) {
      return (
        <Image
          source={{ uri: uri }}
          style={styles.imageIcon}
        />
      );
    }
    return (
      <Image
        source={IMAGE_EMPTY}
        style={styles.imageIcon}
      />
    );
  };

  const _renderContent = () => {
    if (_.isEmpty(listNotificationTask)) {
      return (
        <Text style={styles.txtNothing}>
          {I18n.t("NOTIFICATION.NOTIFICATION_MESSAGE_NOTHING")}
        </Text>
      );
    }
    return listNotificationTask?.map((item, index) => (
      <Box key={index}>
        {
          <Swipeable
            renderRightActions={() => {
              return (
                <Box
                  center
                  margin="m"
                  key={item._id}
                >
                  <TouchableOpacity
                    style={styles.wrapBtnDelete}
                    onPress={() => _handleDeleteNotification(item._id)}
                  >
                    <RectButton style={styles.actionButton}>
                      <Icon
                        name="trash"
                        size="xxxl"
                      />
                    </RectButton>
                  </TouchableOpacity>
                </Box>
              );
            }}
            key={item._id + index}
            onSwipeableOpen={() => closeRow(item._id + index)}
            // Những row ở hàng khác không bị thay đổi
            ref={(ref) => (row[item._id + index] = ref)}
          >
            {/* Item Notification */}
            <TouchableOpacity
              testID={"notification_" + index}
              onPress={() => _onPressItemNotification(item)}
              style={styles.wrapItemNotification}
            >
              <Box
                row
                key={index}
                style={styles.cardSwipeItem}
              >
                <Box
                  center
                  style={
                    !item.isRead ? styles.imageItem : styles.imageItemIsRead
                  }
                >
                  {_renderThumbnail(item?.thumbnail, item?.isRead)}
                </Box>
                <Box style={styles.textItem}>
                  <Text
                    bold
                    color={!item.isRead ? "black" : "grey1"}
                    numberOfLines={2}
                  >
                    {item?.title || item?.description}
                  </Text>
                  <Text
                    fontSize="m"
                    style={styles.txtCreatedAt}
                    color={!item.isRead ? "black" : "grey1"}
                  >
                    {formatDate(item?.createdAt, "other")}
                  </Text>
                </Box>
                <Box>{!item.isRead ? <Box style={styles.isRead} /> : null}</Box>
              </Box>
              {index < listNotificationTask.length - 1 && <Divider />}
            </TouchableOpacity>
          </Swipeable>
        }
      </Box>
    ));
  };

  return (
    <Card
      flex
      style={styles.containerCardSwipe}
    >
      <Box style={{ paddingBottom: spacing.xl }}>
        <Text bold>{I18n.t("NOTIFICATION.TASK_NOTIFICATION")}</Text>
      </Box>
      <Divider />
      <Box>{_renderContent()}</Box>
    </Card>
  );
};

export default NotificationTask;
