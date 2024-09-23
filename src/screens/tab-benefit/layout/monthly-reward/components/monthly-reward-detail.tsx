// Components
import { Box, Container, Divider, Text, Icon, Alert } from "components";
// React
import { useContext } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
// Styles
import styles from "../styles";
// Libs
import { LocalizationContext } from "libs/context";
import { colors } from "libs/theme";
import { getCountry } from "libs/helper";
// Others Libs
import StepIndicator from "react-native-step-indicator";
import _ from "lodash";
import ModalRewardDetail from "./modal-detail-reward";
import ConditionReceive from "./condition-receive";
import LevelReward from "./level-reward";

const MonthlyRewardDetail = ({ route }) => {
  const I18n = useContext(LocalizationContext);
  const { dataReward, conditionReceive } = route.params;

  // Check dataReward is empty
  if (_.isEmpty(route?.params?.dataReward)) {
    return null;
  }

  const nextRewardHours = _.get(route.params, "dataReward.nextRewardHours", 0);
  const nextRewardGift = _.get(route.params, "dataReward.nextRewardGift", 0);
  const currentRewardHours = _.get(route.params, "dataReward.currentRewardHours", 0);
  const currentRewardGift = _.get(route.params, "dataReward.currentRewardGift", 0);
  const nDoneTaskInMonth = _.get(route.params, "dataReward.nDoneTaskInMonth", 0);
  const remainingDays = _.get(route.params, "dataReward.remainingDays", 0);

  // Số giờ cần làm thêm = số giờ tiếp theo - số giờ làm việc được trong tháng
  const moreTime = nextRewardHours - nDoneTaskInMonth;
  const country = getCountry();

  const customStyles = {
    currentStepIndicatorSize: 25,
    stepIndicatorSize: 25,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 0,
    stepStrokeWidth: 3,
    stepIndicatorLabelFontSize: 10,
    currentStepLabelColor: colors.secondary,
    stepStrokeCurrentColor: colors.secondary,
    stepIndicatorFinishedColor: colors.success,
    // Màu sắc của đường tròn các bước đang được chọn
    stepIndicatorCurrentColor: colors.secondary,
    // Màu sắc của nhưng thứ chưa hoàn thành
    stepIndicatorLabelUnFinishedColor: colors.grey2,
    stepStrokeUnFinishedColor: colors.grey2,
    // Cái đường phân cách cho những bước chưa hoàn thành
    separatorUnFinishedColor: colors.grey2,
    // Đường viền cho những thứ đã hoàn thành
    stepStrokeFinishedColor: colors.success,
    // Cái đường phân cách cho những bước hoàn thành
    separatorFinishedColor: colors.success,
  };

  // currentPosition là số giờ mà Tasker sẽ đạt được và hiện lên
  const indexDataRewards = dataReward?.awards?.findIndex(
    (item: any) => item.hours === currentRewardHours
  );
  // Lấy vị trí trong mảng dataReward?.awards
  const currentPosition = indexDataRewards !== -1 ? indexDataRewards + 1 : 0;

  // name Labels: [70,95,155]
  const labels = dataReward?.awards.map((item, index) => (
    <Box style={styles.boxLabel}>
      {index === currentPosition ? (
        <Text
          color="white"
          fontSize="m"
          bold
        >
          {item.hours.toString()} {I18n.t("TAB_BENEFIT.HOURS")}
        </Text>
      ) : (
        <Text
          color="grey2"
          fontSize="m"
        >
          {item.hours.toString()} {I18n.t("TAB_BENEFIT.HOURS")}
        </Text>
      )}
    </Box>
  ));

  const renderStepIndicator = ({ position, stepStatus }) => {
    const icons = {
      finished: "checked",
      unfinished: "unChecked",
      current: "unChecked",
    };
    return (
      <Box>
        <Icon
          size="l"
          color={stepStatus === "current" ? "secondary" : "white"}
          name={icons[stepStatus]}
        />
      </Box>
    );
  };

  const onPress = () => {
    return Alert.alert.open({
      title: "TAB_BENEFIT.DETAIL_REWARD",
      message: (
        <ModalRewardDetail
          dataReward={dataReward}
          nextRewardHours={nextRewardHours}
          currency={country?.currency?.sign}
        />
      ),
    });
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.containerStyle}>
        <StepIndicator
          labels={labels}
          direction="horizontal"
          stepCount={labels.length}
          customStyles={customStyles}
          currentPosition={currentPosition}
          renderStepIndicator={renderStepIndicator}
        />

        <Box
          row
          style={styles.boxHeader}
        >
          <Box row>
            <Text color="white">{I18n.t("TAB_BENEFIT.NEXT_STEP")}</Text>
            <Text
              bold
              color="white"
            >
              {" "}
              {nextRewardHours} {I18n.t("TAB_BENEFIT.HOURS")}
            </Text>
          </Box>
          <Box>
            <TouchableOpacity onPress={onPress}>
              <Text color="white">{I18n.t("TAB_BENEFIT.VIEW_DETAIL")}</Text>
              <Divider
                width={1}
                color="white"
              />
            </TouchableOpacity>
          </Box>
        </Box>

        {/* Card: Giờ cần làm */}
        <LevelReward
          moreTime={moreTime}
          remainingDays={remainingDays}
          nextRewardGift={nextRewardGift}
          nDoneTaskInMonth={nDoneTaskInMonth}
          currentRewardGift={currentRewardGift}
        />

        {/* Card:Lưu ý   */}
        <ConditionReceive data={conditionReceive} />
      </ScrollView>
    </Container>
  );
};
export default MonthlyRewardDetail;
