import isReadNotificationChat from "apis/notification/read-notification-chat";
// Component
import { Box, Card, Text, Image, Badge, TransitionView } from "@src/components";
import RenderNotificationChatApp from "../component/service";
// React
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  InteractionManager,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
// Redux
import { getListChat, setLoading } from "redux/slice/app-slice";
//styles
import styles from "./styles";
// Types
import { IDataListChat } from "screens/chat/layout/types";
import { LocalizationContext } from "libs/context";
import { formatDate, getTextWithLocale, navigateTo } from "libs/helper";
import _ from "lodash";
import { store } from "redux/store";

// Hiện loading lần đầu tiên
let isShowLoading = true;

const NotificationChat = () => {
  //Hook
  const I18n = useContext(LocalizationContext);
  const [respondListChat, setRespondListChat] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  // const navigation = useNavigation();
  const isFocused = useIsFocused();
  //Init Data
  const initData = async () => {
    // Nếu không có data -> set loading
    isShowLoading && (await store.dispatch(setLoading(true)));
    const respond = await store.dispatch(getListChat());
    // ko hiện loading nữa
    isShowLoading = false;
    // Hide loading
    await store.dispatch(setLoading(false));

    setRespondListChat(respond?.payload);
  };
  // Call API
  // useEffect(() => {
  //   isFocused && initData();
  // }, [isFocused]);

  useFocusEffect(
    React.useCallback(() => {
      const interaction = InteractionManager.runAfterInteractions(() => {
        // Reset get data when destroy
        initData();
      });
      return () => interaction.cancel();
    }, [])
  );

  // Full to refresh data
  const onRefresh = React.useCallback(() => {
    // Show refreshing
    setRefreshing(true);

    // Init data task confirm
    isFocused && initData();

    // Hide refreshing
    setRefreshing(false);
  }, [isFocused]);

  const isReadChatNotificationPress = async (id: string) => {
    const respond = await isReadNotificationChat(id);
  };

  // Render List Chat
  const renderListChat = ({
    item,
    index,
  }: {
    item: IDataListChat;
    index: number;
  }) => {
    return (
      <TransitionView index={index}>
        <Card flex>
          {/* Render badge */}
          {!item.isRead ? <Badge badgeStyle={styles.badgeStyle} /> : null}
          {/* End render badge */}
          <TouchableOpacity
            onPress={() => {
              isReadChatNotificationPress(item.chatId);
              navigateTo("Chat", { taskId: item.taskId });
            }}
          >
            <Box
              flex
              row
              between
              alignCenter
              testID={"btnNotificationItemChat" + index}
            >
              <Box center>
                <Image
                  source={{ uri: item?.askerAvatar }}
                  style={styles.imageAvatar}
                />
              </Box>
              <Box
                flex
                style={{ flexDirection: "column" }}
              >
                <Box style={styles.askerName}>
                  <Text
                    bold
                    numberOfLines={1}
                  >
                    {item?.askerName}
                  </Text>
                </Box>
                <Box
                  row
                  alignCenter
                >
                  <Box
                    flex
                    style={styles.textServiceText}
                  >
                    <Text numberOfLines={1}>
                      {getTextWithLocale(item?.serviceText)}
                    </Text>
                  </Box>
                  <Box style={styles.serviceText}>
                    <Text fontSize="m">{formatDate(item?.date, "other")}</Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </TouchableOpacity>
        </Card>
      </TransitionView>
    );
  };

  const _renderContent = () => {
    if (_.isEmpty(respondListChat)) {
      return (
        <Box>
          <RenderNotificationChatApp />
          <Box center>
            <Text>{I18n.t("NOTIFICATION_CHAT.NOTHING")}</Text>
          </Box>
        </Box>
      );
    }
    return (
      <FlatList
        data={respondListChat}
        renderItem={renderListChat}
        keyExtractor={(item, index) => `${item._id}-${index}`}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        //  Render header
        ListHeaderComponent={RenderNotificationChatApp}
        //  End render header
      />
    );
  };

  return (
    <Box
      flex
      style={styles.container}
    >
      {/* Render list chat */}
      {_renderContent()}
      {/* End render list chat */}
    </Box>
  );
};

export default NotificationChat;
