import { Box, Card, Icon, Text } from "components";
import { LocalizationContext } from "libs/context";
import HeaderJourney from "../header";
import BonusJourney from "../bonus";
import { useContext } from "react";
import styles from "./styles";
import Conditions from "../conditions";

const Passed = ({ item }) => {
  const I18n = useContext(LocalizationContext);

  return (
    <Card style={styles.wrapCardPassed}>
      {/* Render label */}
      <Box center>
        <Box row center style={[
          styles.boxContainer,
          styles.boxContainerSuccess
        ]}
        >
          <Icon
            name={"checkDouble"}
            size="l"
          />
          <Box style={styles.boxTxt}>
            <Text
              bold
              color={"white"}
            >{I18n.t("JOURNEY.CURRENT_LEVEL")}</Text>
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
      {/* TODO: Thêm conđition cho card passed */}
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
        status={item?.status}
        missions={item?.missions}
        notReceive={item?.notReceive}
      />
      {/* End prize and bonus */}
    </Card>
  )
};
export default Passed;