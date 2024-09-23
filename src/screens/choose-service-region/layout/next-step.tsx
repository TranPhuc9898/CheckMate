/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2023-03-02 11:11:08
 * @modify date 2023-03-02 11:11:08
 * @desc [Show error screen when error occurs]
 */

import { Box, Card, Text } from "components";
import { FC, useContext, useState, useEffect } from "react";
import { LocalizationContext } from "libs/context";
import { borderRadius, colors, spacing } from "libs/theme";
import { TouchableOpacity } from "react-native";

interface IErrorScreen {
  step?: any;
  setStep?: any;
  disabled?: boolean;
  onNextStep?: any;
}

const ErrorScreen: FC<IErrorScreen> = ({
  setStep,
  step,
  disabled,
  onNextStep,
}) => {
  const I18n = useContext(LocalizationContext);

  return (
    <Box row>
      <Box
        center
        style={{ width: "50%", paddingRight: spacing.s }}
      >
        {step !== 1 ? (
          <TouchableOpacity
            onPress={() => setStep(step - 1)}
            style={{
              borderRadius: borderRadius.s,
              borderWidth: 1,
              borderColor: colors.secondary,
              alignSelf: "stretch",
              alignItems: "center",
              paddingVertical: spacing.m,
            }}
          >
            <Text
              bold
              color="secondary"
            >
              {I18n.t("TASK_DETAIL.BUTTON_NO")}
            </Text>
          </TouchableOpacity>
        ) : null}
      </Box>
      <Box
        center
        style={{ width: "50%", paddingLeft: spacing.s }}
      >
        <TouchableOpacity
          testID="btnNextStep"
          disabled={disabled}
          onPress={() => {
            onNextStep && onNextStep();
            setStep(step + 1);
          }}
          style={{
            borderRadius: borderRadius.s,
            backgroundColor: disabled ? colors.grey3 : colors.secondary,
            alignSelf: "stretch",
            alignItems: "center",
            paddingVertical: spacing.m,
          }}
        >
          <Text
            bold
            color="white"
          >
            {I18n.t("TAB_ACCOUNT.NEXT")}
          </Text>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default ErrorScreen;
