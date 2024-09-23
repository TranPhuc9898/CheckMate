import { useContext } from "react";
import { Box, Card, Icon, Text } from "components";
import { LocalizationContext } from "libs/context";
import Conditions from "../conditions";
import HeaderJourney from "../header";
import GetReward from "../get-reward";
import BonusJourney from "../bonus";
import styles from "./styles";

const Locked = ({ item }) => {
  const I18n = useContext(LocalizationContext);

  return (
    <Card style={styles.wrapCardLock}>
      {/* Render label */}
      <Box center>
        <Box row center style={[
          styles.boxContainer,
          styles.containerLocked
        ]}
        >
          <Icon
            name={"lock"}
            color="grey1"
            size="l"
          />
          <Box style={styles.boxTxt}>
            <Text
              bold
              color={"grey1"}
            >{I18n.t("JOURNEY.LABEL_LOCKED")}</Text>
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
      />
      {/* End prize and bonus */}
    </Card>
  )
};
export default Locked;