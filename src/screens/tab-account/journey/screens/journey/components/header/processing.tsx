import { Box, Image, Text } from "components";
import { IObjectText, getTextWithLocale } from "libs/helper";
import styles from "./styles";
import { FC } from "react";

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
        >
          {getTextWithLocale(title)}
        </Text>
        <Text
          variant="h2"
          style={styles.txtTitle}
        >
          {getTextWithLocale(text)}
        </Text>
      </Box>
      <Box style={styles.boxIcon}>
        <Image
          source={{ uri: linkIcon }}
          style={styles.iconBee}
        />
      </Box>
    </Box>
  )
};

export default HeaderJourney;