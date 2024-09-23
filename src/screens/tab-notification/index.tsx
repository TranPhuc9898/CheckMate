import { spacing } from "@src/libs/theme";
import { LocalizationContext } from "libs/context";
import NotificationTab from "navigation/notification-tab";
// Component
import { Container } from "@src/components";
import HeaderHome from "components/header-home";
// React
import { Platform, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useContext } from "react";
// Redux
import { useSelector } from "react-redux";
import { setBadgeNotification } from "./slice";
import { RootState } from "redux/slice";
import { setBadge } from "redux/slice/app-slice";
import { store } from "redux/store";

const Notification = (props: any) => {
  const I18n = useContext(LocalizationContext);

  // Redux
  const { listChat } = useSelector((state: RootState) => state.app);
  const { listNotificationTask } = useSelector(
    (state: RootState) => state.notification
  );

  // Set Badge
  useEffect(() => {
    store.dispatch(setBadge(listChat));
    store.dispatch(setBadgeNotification(listNotificationTask));
  }, [listChat, listNotificationTask]);

  return (
    <Container headerShow={false}>
      {/* <Campaign /> */}
      <HeaderHome
        title={I18n.t("HOME.TAB_NOTIFICATION")}
        navigation={props?.navigation}
      />
      <NotificationTab />
    </Container>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        marginTop: spacing.m,
        marginBottom: spacing.xl,
      },
    }),
  },
});
