import { Text } from "components";
import { TouchableOpacity } from "react-native";
import styles from "./styles";

interface ITimePicker {
  time: number;
  label: string;
  timePicked: number;
  onPress: (time: number) => void;
}

const TimePicker = ({ time, label, timePicked, onPress }: ITimePicker) => {
  const _checkTimePicked = (time) => {
    return Boolean(time === timePicked);
  };
  return (
    <TouchableOpacity
      style={[
        styles.boxTime,
        _checkTimePicked(time) ? styles.backgroundPicked : null,
      ]}
      onPress={() => onPress(time)}
    >
      <Text
        bold
        center
        fontSize="m"
        color={_checkTimePicked(time) ? "white" : "black"}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
export default TimePicker;
