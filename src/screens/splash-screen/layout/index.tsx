import { Box } from "components";
import Lottie from "components/lottie";
import styles from "./styles";
import Config from "react-native-config";
import { setLoadingPersist } from "redux/slice/app-slice";
import { useDispatch } from "react-redux";
import { modeConfig } from "libs/config";
export default function () {
  const dispatch = useDispatch();

  if (Config.MODE === modeConfig.dev) {
    dispatch(setLoadingPersist(false));
    return null;
  }

  return (
    <Box
      center
      style={styles.container}
    >
      <Lottie
        style={styles.lottieBell}
        source={require("assets/lottie/splash-screen.json")}
        autoPlay={true}
        loop={false}
        onAnimationFinish={() => dispatch(setLoadingPersist(false))}
      />
    </Box>
  );
}
