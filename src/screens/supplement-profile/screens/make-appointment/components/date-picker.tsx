import { Box, Divider, Text } from "components";
import { capitalizedFirstStr, formatDate } from "libs/helper";
import { colors } from "libs/theme";
import moment from "moment";
import { TouchableOpacity } from "react-native";
import styles from "./styles";
interface DatePickerProps {
  date: Date;
  datePicked: Date;
  onPress: (date: Date) => void;
  checkDisabled: (date: Date) => boolean;
}

const DatePicker = ({ date, datePicked, checkDisabled, onPress }: DatePickerProps) => {
  const _checkSameDate = () => {
    if (moment(date).isSame(datePicked, "day")) {
      return true;
    }
    return false;
  };

  return (
    <TouchableOpacity 
      onPress={() => onPress(date)}
      disabled={checkDisabled(date)}
    >
      <Box style={[styles.boxDate, _checkSameDate() ? styles.backgroundPicked : null, checkDisabled(date) ? styles.dateDisabled : null ]}>
        <Text
          bold
          center
          fontSize="m"
          color={_checkSameDate() ? "white" : "black"}
          style={checkDisabled(date) ? styles.txtDisabled : null}
        >
          {capitalizedFirstStr(formatDate(date, "weekday"))}
        </Text>
        <Divider
          width={1}
          color={_checkSameDate() ? colors.white : colors.secondary3}
          style={[styles.dividerStyle]}
        />
        <Text
          bold
          center
          fontSize="m"
          color={_checkSameDate() ? "white" : "black"}
          style={checkDisabled(date) ? styles.txtDisabled : null}
        >
          {formatDate(date, "dateMonth")}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};
export default DatePicker;
