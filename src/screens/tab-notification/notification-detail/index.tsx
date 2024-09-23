import { Box, Card, Container, Image, MarkDown, Text } from "components";
import { LocalizationContext } from "libs/context";
import { IRespond, formatDate, getUserIdGlobal, handleError, popToTop } from "libs/helper";
import _ from "lodash";
import { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";

//styles
import styles from "./styles";
import getNotificationByIdAPI, { IGetNotificationById } from "apis/notification/get-notificaiton-by-id";
import { store } from "redux/store";
import { setLoading } from "redux/slice/app-slice";
import readNotificationAPI, { IParamNotificationIsRead } from "apis/notification/read-notification";

const NotificationDetail = (props) => {
  const I18n = useContext(LocalizationContext);
  const title = props?.route?.params?.data?.title;
  const image = props?.route?.params?.data?.image;
  const description = props?.route?.params?.data?.description;
  const createdAtText = formatDate(props?.route?.params?.data?.createdAt);
  const notificationId = props?.route?.params?.data?.notificationId;
  const [notification, setNotification] = useState(null);

  const _initDataNotification = async () => {
    if (!description && notificationId) {
      // Show loading
      await store.dispatch(setLoading(true));
      // Params
      const params: IGetNotificationById = {
        taskerId: getUserIdGlobal(),
        notificationId: notificationId
      }
      // Get notification by Id
      const respond: IRespond = await getNotificationByIdAPI(params);
      // Hide loading
      await store.dispatch(setLoading(false));
      // Handle if error
      if (!respond?.isSuccess) {
        return handleError(respond.error, popToTop)
      }
      // Save notification to state
      return setNotification(respond.data);
    }
  };

  useEffect(() => {
    // Get notification by id
    _initDataNotification()
  }, []);

  // Get image from param or from api get notification
  const getImage = () => {
    let url = image || notification?.image;
    if (_.isEmpty(url)) {
      return null;
    }
    return (
      <Box
        center
        style={styles.boxItem}
      >
        <Image
          source={{ uri: url || notification?.image }}
          style={styles.image}
        />
      </Box>
    )
  };

  const getDescription = () => {
    const txtDescription = description || notification?.description;
    if (!txtDescription) {
      return null;
    }
    return (
      <MarkDown
        textStyle={styles.txtMarkDown}
        bulletListIcon={styles.bulletListIcon}
        text={txtDescription}
      />
    )
  }

  return (
    <Container>
      <Card style={styles.cardContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            bold
            center
            variant="h3"
          >
            {_.isEmpty(title) ? I18n.t("NOTIFICATION.TAB_NOTIFICATION") : title}
          </Text>
          <Box
            flex
            style={styles.wrapContent}
          >
            <Text
              fontSize="m"
              color="grey0"
              style={styles.txtCreatedAt}
            >
              {createdAtText ? createdAtText : null}
            </Text>
            {getImage()}
            {getDescription()}
          </Box>
        </ScrollView>
      </Card>
    </Container>
  );
};

export default NotificationDetail;
