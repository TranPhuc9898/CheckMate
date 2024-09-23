import CountDown from "react-native-countdown-component";
import { colors, borderRadius, spacing } from "@src/libs/theme";
import { getFontFamilyByLocale } from "libs/helper";

interface ICustomCountdown extends React.ComponentProps<typeof CountDown> {}
/**
 * @see https://github.com/talalmajali/react-native-countdown-component
 */
const CustomImage: React.FunctionComponent<ICustomCountdown> = (props) => {
  return (
    <CountDown
      {...props}
      onFinish={props?.onPress}
      size={20}
      timeToShow={["H", "M", "S"]}
      showSeparator={true}
      style={[
        {
          backgroundColor: colors.grey2,
          borderRadius: borderRadius.s,
          paddingHorizontal: spacing.xl,
        },
        props.style,
      ]}
      timeLabels={{ h: null, m: null, s: null }}
      digitStyle={{
        backgroundColor: "transparent",
      }}
      digitTxtStyle={{ color: colors.white, fontFamily: getFontFamilyByLocale().bold }}
      separatorStyle={{ color: colors.white, fontFamily: getFontFamilyByLocale().bold }}
    />
  );
};

export default CustomImage;
