import { Box, Text } from "components";
import { LocalizationContext } from "libs/context";
import {
  getIsoCodeGlobal,
  getTextWithLocale,
  getUnitAirConditionerTextByBTU,
  getUnitAirConditionerTextByHP,
} from "libs/helper";
import { FC, useContext } from "react";
import { INDONESIA, THAILAND, VIETNAM } from "libs/constants";
import styles from "../styles";

interface IDetails {
  detail: any;
}

const Details: FC<IDetails> = ({ detail }) => {
  const I18n = useContext(LocalizationContext);

  const countryFunc = new Map([
    [VIETNAM, getUnitAirConditionerTextByHP],
    [THAILAND, getUnitAirConditionerTextByBTU],
    [INDONESIA, getUnitAirConditionerTextByHP],
  ]);

  const _renderText = ({ from, to }) => {
    const unitAC = countryFunc.get(getIsoCodeGlobal());
    return unitAC(from, to, I18n);
  };

  return (
    <Box style={styles.containerListUnit}>
      <Box
        row
        alignCenter
        style={styles.containerHeader}
      >
        <Box
          center
          flex
        >
          <Text fontSize="m">{I18n.t("TASK_DETAIL.TYPE_AC")}</Text>
        </Box>
        <Box
          center
          flex
        >
          <Text fontSize="m">{I18n.t("TASK_DETAIL.QTY")}</Text>
        </Box>
        <Box
          center
          flex
        >
          <Text fontSize="m">{I18n.t("TASK_DETAIL.TASK_AIR_CONDITIONER")}</Text>
        </Box>
      </Box>
      {detail.map((item, index) => (
        <Box
          key={index}
          row
          alignCenter
          style={styles.containerRecord}
        >
          <Box flex>
            <Box>
              <Text
                bold
                fontSize="m"
              >
                {getTextWithLocale(item?.type?.text)}
              </Text>
              <Text
                color="grey1"
                fontSize="m"
              >
                {_renderText({
                  from: item?.hp?.from,
                  to: item?.hp?.to,
                })}
              </Text>
            </Box>
          </Box>
          <Box
            flex
            center
          >
            <Text fontSize="m">{item?.quantity}</Text>
          </Box>
          <Box flex>
            {item?.services.map((service, index) => (
              <Text
                key={index}
                fontSize="m"
                style={styles.txtTask}
              >
                {getTextWithLocale(service?.text)}
              </Text>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};
export default Details;
