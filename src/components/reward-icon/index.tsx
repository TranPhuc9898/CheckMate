import _ from "lodash";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootState } from "redux/slice";
import { useSelector } from "react-redux";
import { Box, Text, LottieView } from "@src/components";
import styles from "./styles";

const RewardIcon = (props) => {
  const navigation = useNavigation();
  const { numberOfGift } = useSelector((state: RootState) => state.app);

  return (
    <TouchableOpacity
      testID="btnMyPoint"
      onPress={() => navigation.navigate("MyGift")}
    >
      <Box style={styles.container}>
        <LottieView
          source={require("assets/lottie/reward.json")}
          style={styles.icon}
          autoPlay={true}
          loop={true}
        />
        {numberOfGift ? (
          <Box style={styles.badge}>
            <Text
              fontSize="s"
              color="white"
              bold
            >
              {numberOfGift}
            </Text>
          </Box>
        ) : null}
      </Box>
    </TouchableOpacity>
  );
};

export default RewardIcon;
