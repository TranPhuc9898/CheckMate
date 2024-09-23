import { useContext } from "react";
import { LocalizationContext } from "libs/context";
import { Box, Card, Text } from "components";
import Conditions from "../conditions";
import HeaderJourney from "../header";
import GetReward from "../get-reward";
import BonusJourney from "../bonus";
import styles from "./styles";

const Processing = ({ item, initDataJourney }) => {
  const I18n = useContext(LocalizationContext);

  return (
    <Card style={styles.wrapCardProcessing}>
      {/* Render label */}
      <Box center>
        <Box row center style={[
          styles.boxContainer,
          styles.boxContainerProcessing
        ]}
        >
          <Box style={styles.boxTxt}>
            <Text
              bold
              color={"secondary"}
            >{I18n.t("JOURNEY.LABEL_PROCESSING")}</Text>
          </Box>
        </Box>
      </Box>
      {/* End label */}

      {/* Render header  */}
      <HeaderJourney
        text={item?.text}
        title={item?.title}
        status={item?.status}
        linkIcon={item?.icon}
      />
      {/* End header */}

      {/* Render condition */}
      <Conditions
        text={item?.text}
        title={item?.title}
        status={item?.status}
        conditions={item?.conditions}
      />

      {/* Prize and Bonus */}
      <BonusJourney
        bonus={item?.bonus}
        reward={item?.reward}
        status={item?.status}
        missions={item?.missions}
        notReceive={item?.notReceive}
      />
      {/* End prize and bonus */}

      {/* Render button get reward */}
      <GetReward isCanGetReward={item?.isCanGetReward} initDataJourney={initDataJourney} />
      {/* End button get reward */}
    </Card>
  )
};
export default Processing;