import { Box, Card, Text } from "components";
import { getTextWithLocale } from "libs/helper";
import styles from "../styles";

const ConditionReceive = ({ data }) => {
  return (
    <Card>
      {data.map((item, index) => {
        return (
          <Box
            key={index}
            style={styles.textBox}
          >
            <Text
              color="black"
              bold
            >
              {getTextWithLocale(item?.title)}
            </Text>
            <Box>
              {item?.content.map((_, index) => {
                return (
                  <Box
                    key={index}
                    style={styles.textBox}
                  >
                    <Text>
                      {"•"} {getTextWithLocale(_)}
                    </Text>
                  </Box>
                );
              })}
            </Box>
          </Box>
        );
      })}
    </Card>
  );
};
export default ConditionReceive;
