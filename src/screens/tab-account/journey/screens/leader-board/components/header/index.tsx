import { Box, Card, Divider, Image, Text } from "components";
import { IObjectText, getTextWithLocale } from "libs/helper";
import { FC } from "react";
import styles from "../../styles";
import { colors } from "libs/theme";
interface IHeaderLeaderBoard {
  title: IObjectText;
  text: IObjectText;
  cityName: string;
  icon: any;
}

const HeaderLeaderBoard: FC<IHeaderLeaderBoard> = ({
  icon,
  text,
  title,
  cityName,
}) => {

  if (!text && !title) {
    return null;
  }

  return (
    <Card style={styles.cardHeader}>
      <Box
        row
        between
        alignCenter
      >
        <Box>
          <Text bold color="secondary">{getTextWithLocale(title)}</Text>
          <Text variant="h2">{getTextWithLocale(text)}</Text>
          <Divider color={colors.grey4} width={1} style={styles.dividerStyle}/>
          <Text fontSize="m" fontWeight="m">{cityName}</Text>
        </Box>
        <Box>
          <Image
            source={{ uri: icon }}
            style={styles.logoBee}
          />
        </Box>
      </Box>
    </Card>
  );
};
export default HeaderLeaderBoard;
