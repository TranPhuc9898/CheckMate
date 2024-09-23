import { Box, Icon, Image, Text } from "components";
import StepIndicator from "react-native-step-indicator";
import { FC } from "react";
import { colors } from "libs/theme";
import styles from "./styles";
import AppointmentContent from "./appointment-content";

interface IHeaderProcedure {
  isDone: boolean;
  totalStep: number;
  currentStep: number;
}

const HeaderProcedure: FC<IHeaderProcedure> = ({
  isDone,
  totalStep,
  currentStep,
}) => {
  const customStyles = {
    stepStrokeWidth: 3,
    stepIndicatorSize: 25,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 0,
    currentStepIndicatorSize: 25,
    stepIndicatorLabelFontSize: 14,
    currentStepLabelColor: colors.secondary,
    stepStrokeCurrentColor: colors.secondary,
    stepIndicatorFinishedColor: colors.success,
    stepIndicatorLabelCurrentColor: colors.white,
    // Màu sắc của đường tròn các bước đang được chọn
    stepIndicatorCurrentColor: colors.secondary,
    // Màu sắc của nhưng thứ chưa hoàn thành
    stepIndicatorLabelUnFinishedColor: colors.secondary,
    stepStrokeUnFinishedColor: colors.secondary3,
    // Cái đường phân cách cho những bước chưa hoàn thành
    separatorUnFinishedColor: colors.primary3,
    stepIndicatorUnFinishedColor: colors.secondary3,
    // Đường viền cho những thứ đã hoàn thành
    stepStrokeFinishedColor: colors.success,
    // Cái đường phân cách cho những bước hoàn thành
    separatorFinishedColor: colors.success,
  };

  const renderStepIndicator = ({ position, stepStatus }) => {
    if (stepStatus === "finished") {
      return (
        <Icon
          size="l"
          color={stepStatus === "current" ? "secondary" : "secondary3"}
          name="checked"
        />
      );
    }
    return (
      <Text
        fontSize="m"
        color={stepStatus === "current" ? "white" : "secondary"}
      >
        {position + 1}
      </Text>
    );
  };

  const _renderIndicator = () => {
    // Nếu chỉ có 1 bước thì không render ra step indicator
    if (totalStep < 2) return null;
    return (
      <Box testID="indicator">
        <StepIndicator
          direction="horizontal"
          stepCount={totalStep}
          customStyles={customStyles}
          currentPosition={currentStep}
          renderStepIndicator={renderStepIndicator}
        />
      </Box>
    );
  };

  const _renderImage = () => {
    if (isDone) {
      return <AppointmentContent />;
    }
    return (
      <Box
        center
        margin="m"
        testID="processingBackground"
      >
        <Image
          source={require("assets/images/active-account/background-not-active-account.png")}
          style={styles.imageStyle}
        />
      </Box>
    );
  };

  return (
    <Box>
      {/* Render indicator */}
      {_renderIndicator()}
      {/* End indicator */}

      {/* Render header content */}
      {_renderImage()}
      {/* End header content */}
    </Box>
  );
};
export default HeaderProcedure;
