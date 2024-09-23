import { Image } from "components";
import { Grayscale } from "react-native-color-matrix-image-filters";
import { statusStep } from "screens/procedure-active-account/layout";
import styles from "../layout/styles";

const BackgroundImage = ({ permission, imageUrl }) => {
  if (permission === statusStep.open) {
    return (
      <Image
        source={imageUrl}
        style={styles.imageStyle}
      />
    );
  }
  return (
    <Grayscale>
      <Image
        source={imageUrl}
        style={styles.imageStyle}
      />
    </Grayscale>
  );
};
export default BackgroundImage;