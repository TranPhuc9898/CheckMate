import { TouchableOpacity, View } from "react-native";

import { Icon } from "components";
import { navigateTo } from "libs/helper";

import styles from "./styles";

const IconNotification = () => {
  return (
    <TouchableOpacity
      onPress={() => navigateTo("Notification")}
      testID="btnNotification"
    >
      <View style={styles.buttonNotification}>
        <Icon
          name="notification"
          size="xxl"
        />
        {/* Todo: Làm cho sa u này */}
        {/* <Badge containerStyle={styles.badge} /> */}
      </View>
    </TouchableOpacity>
  );
};

export default IconNotification;
