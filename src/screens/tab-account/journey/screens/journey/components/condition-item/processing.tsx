import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { IObjectText, getTextWithLocale, navigateTo } from "libs/helper";
import { Alert, Box, Image, MarkDown } from "components";
import ConditionDetail from "../condition-detail";
import { statusJourney } from "../..";
import { colors } from "libs/theme";
import styles from "./styles";

const { width } = Dimensions.get("window");

interface IConditionItem {
  dataCondition?: any;
  text?: IObjectText;
  title?: IObjectText;
}

const ConditionItem: React.FC<IConditionItem> = ({
  dataCondition,
  title,
  text,
}) => {

  const _handleOpenDetail = () => {
    // Bình thường thì hiển thị thông tin và nút Đóng
    const objectAlert = {
      title: "JOURNEY.TITLE_ALERT",
      message: (
        <ConditionDetail
          text={text}
          title={title}
          dataCondition={dataCondition}
        />
      ),
      actions: [{
        testID: "btnCloseAlert",
        text: "DIALOG.BUTTON_CLOSE",
        onPress: () => {
          Alert.alert.close();
        }
      }]
    };
    // Nếu có navigate to thì navigate tới trang chỉ định
    if (dataCondition?.navigateTo) {
      objectAlert.actions = [{
        testID: "btnCloseAlert",
        text: "JOURNEY." + dataCondition.name,
        onPress: () => {
          navigateTo(dataCondition.navigateTo);
          Alert.alert.close();
        }
      }]
    }
    return Alert.alert.open(objectAlert);
  }

  return (
    <TouchableOpacity
      testID="PROCESSING_TEST"
      style={styles.container}
      // TODO: Đóng tạm đợi chốt
      disabled={true}
      onPress={_handleOpenDetail}
    >
      <Box center>
        <AnimatedCircularProgress
          width={15}
          rotation={240}
          lineCap="round"
          size={width / 3.2}
          arcSweepAngle={240}
          backgroundWidth={15}
          // tintColor={dataCondition.status === statusJourney.passed ? colors.success : colors.secondary}
          // fill={dataCondition?.percentage || 0}
          tintColor={colors.success}
          fill={100}
          backgroundColor={colors.secondary3}
          delay={500}
        />
        <Box
          center
          style={styles.wrapIconCondition}
        >
          <Image
            source={{ uri: dataCondition?.icon }}
            style={[styles.image]}
          />
        </Box>
        <Box
          center
          style={styles.labelCondition}
        >
          <MarkDown
            center
            text={getTextWithLocale(dataCondition?.text)}
            textStyle={styles.txtMarkDown}
            paragraphStyle={styles.paragraphStyle}
          />
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default ConditionItem;
