import { FC } from "react";
import { Box, Divider } from "components";
import ConditionItem from "../condition-item";
import { statusJourney } from "../..";
import { colors } from "libs/theme";
import styles from "./styles";
import _ from "lodash";
import { IObjectText } from "libs/helper";

interface IConditions {
  conditions?: any;
  status?: string;
  title?: IObjectText;
  text?: IObjectText;
}

const Conditions: FC<IConditions> = ({ conditions, status, title, text }) => {
  if (_.isEmpty(conditions)) {
    return null;
  }

  return (
    <Box>
      <Divider
        width={1}
        style={styles.dividerStyles}
        color={status === statusJourney.processing ? colors.secondary3 : colors.grey2}
      />
      <Box row alignCenter style={styles.container}>
        {/* Conditions */}
        {conditions?.map((item, index) => {
          return (
            <Box key={index} testID={`${status}_${index}`}>
              <ConditionItem
                text={text}
                title={title}
                status={status}
                dataCondition={item}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  )
};
export default Conditions;