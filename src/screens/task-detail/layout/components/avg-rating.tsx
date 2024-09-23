import { Box, Icon, Text } from "@src/components";
import { FC } from "react";
import styles from "../styles";
interface IAvgRatingAsker {
  numberRating?: any;
  avgRating?: any;
}

const AvgRatingAsker: FC<IAvgRatingAsker> = ({ numberRating, avgRating }) => {
  const _renderAvgRating = () => {
    return (
      <Box row alignCenter>
        <Text variant="h4" color="secondary">{avgRating}</Text>
        <Icon
          name="starFill"
          size="l"
          color="secondary"
        />
      </Box>
    );
  };

  const _renderNumberRating = () => {
    return (
      <Box row alignCenter>
        <Text> ({numberRating}</Text>
        <Box>
          <Icon
            name="accountFill"
            color="primary"
            size="l"
          />
        </Box>
        <Text>)</Text>
      </Box>
    );
  };

  if (!avgRating || !numberRating) {
    return null;
  }

  return (
    <Box
      row
      alignCenter
      style={styles.boxNoteTranslated}
    >
      <Icon
        name="avgRating"
        color="primary"
      />
      <Box row flex alignCenter style={styles.boxContent}>
        {_renderAvgRating()}
        {_renderNumberRating()}
      </Box>
    </Box>
  );
};

export default AvgRatingAsker;
