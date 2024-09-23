import { FC } from "react";
import { Box, Image, Text } from "components";
import { IObjectText, getTextWithLocale } from "libs/helper";
import { Grayscale } from "react-native-color-matrix-image-filters";
import styles from "./styles";

interface IHeaderJourney {
  title?: IObjectText;
  text?: IObjectText;
  linkIcon?: string;
}

const HeaderJourney: FC<IHeaderJourney> = ({ title, text, linkIcon }) => {
  return (
    <Box
      row
      between
      alignCenter
      style={styles.containerHeader}
    >
      <Box flex style={styles.boxTxt}>
        <Text
          bold
          color={"grey1"}
        >
          {getTextWithLocale(title)}
        </Text>
        <Text
          variant="h2"
          style={styles.txtTitle}
          color={"grey1"}
        >
          {getTextWithLocale(text)}
        </Text>
      </Box>
      <Box style={styles.boxIcon}>
        <Grayscale>
          <Image
            source={{ uri: linkIcon }}
            style={styles.iconBee}
          />
        </Grayscale>
      </Box>
    </Box>
  )
};

export default HeaderJourney;