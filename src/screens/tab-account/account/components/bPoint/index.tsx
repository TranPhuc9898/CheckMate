import { useContext } from "react";
import { LocalizationContext } from "@src/libs/context";
import { CardItem, Box, Text, Icon, TransitionView } from "@src/components";
import styles from "./styles";
import { formatMoney, navigateTo } from "libs/helper";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";

const BPoint = () => {
  const I18n = useContext(LocalizationContext);
  const { user } = useSelector((state: RootState) => state.app);

  // Chưa mở cho các dịch vụ company
  if (user?.isCompany || user?.isEmployee) {
    return null;
  }

  return (
    <TransitionView
      index={4}
      duration={1000}
    >
      <CardItem
        testID="MemberInfo"
        iconName="right"
        title={I18n.t("TAB_ACCOUNT.NUMBER_OF_POINT_LABEL")}
        onPress={() => navigateTo("MemberInfo")}
      >
        <Box
          row
          alignCenter
        >
          <Icon
            name="point"
            color="primary"
          />
          <Text style={styles.txtPoint}>
            {I18n.t("TAB_ACCOUNT.NUMBER_OF_POINT", {
              t: formatMoney(user?.point || 0),
            })}
          </Text>
        </Box>
      </CardItem>
    </TransitionView>
  );
};

export default BPoint;
