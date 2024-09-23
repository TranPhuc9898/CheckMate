import { getDefaultHeaderHeight } from "@react-navigation/elements";
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Text, Box } from "@src/components";
import HeaderBackButton from "components/header-back-button";
import styles from "../styles";

const HeaderBCare = ({ navigation, headerTitle }) => {
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets(); // for Iphone X

  // get header height
  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);

  return (
    <Box style={[styles.container, { height: headerHeight }]}>
      <Box
        flex
        style={styles.btnBack}
      >
        <HeaderBackButton navigation={navigation} />
      </Box>
      {/* End button back */}
      <Box style={styles.header}>
        <Text
          color="white"
          variant="h3"
          style={styles.title}
        >
          {headerTitle}
        </Text>
      </Box>
    </Box>
  );
};

export default HeaderBCare;
