/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2023-03-16 18:13:21
 * @modify date 2023-03-16 18:13:21
 * @desc [Child care detail]
 */

import _ from "lodash";
import { FC, useContext } from "react";
import { Box, Divider, Icon, Text } from "@src/components";
import styles from "./styles";
import { LocalizationContext } from "libs/context";
import { getTextWithLocale } from "libs/helper";
import { IDetailInfo } from "..";
import { colors } from "libs/theme";

// Loại máy Nhật bãi
const JAPAN_WM = "JAPAN_WM";

const WashingMachineDetail: FC<IDetailInfo> = ({ detail }) => {
  const I18n = useContext(LocalizationContext);
  if (_.isEmpty(detail)) {
    return null;
  }

  // Do máy Nhật bãi không phải là 1 option mà là 1 loại máy, nên cần loại bỏ ra khỏi option để hiển thị trên UI
  const getOptions = (options = []) => {
    return options.filter((option) => option.name !== JAPAN_WM);
  };

  const TypeJapan = ({ options = [] }) => {
    const typeJapan = options.find((option) => option.name === JAPAN_WM);
    if (!typeJapan) return null;

    return (
      <Text
        fontSize="m"
        color="grey0"
        style={styles.txtType}
      >
        {getTextWithLocale(typeJapan?.text)}
      </Text>
    );
  };

  const NumberOfWM = () => {
    return (
      <Box
        row
        alignCenter
        style={styles.containerRequirement}
      >
        <Icon
          name="washingMachine"
          color="secondary"
        />
        <Box
          flex
          style={styles.boxContent}
        >
          <Text numberOfLines={1}>
            {I18n.t("TASK_DETAIL.NUMBER_OF_WM")}
            {": "}
            <Text bold>{detail.length}</Text>
          </Text>
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      <NumberOfWM />
      <Box style={styles.containerDetail}>
        <Box
          row
          between
        >
          <Text>{I18n.t("TASK_DETAIL.WM_TYPE")}</Text>
          <Text>{I18n.t("TASK_DETAIL.WM_SERVICES")}</Text>
        </Box>
        <Divider
          color={colors.black}
          style={styles.txtLine}
        />
        {detail?.map((item, index) => (
          <Box
            row
            between
            style={styles.txtLine}
            key={"WM" + index}
          >
            <Box>
              <Text bold>{getTextWithLocale(item?.text)}</Text>
              <TypeJapan options={item?.type?.options} />
              <Text
                fontSize="m"
                color="grey0"
                style={styles.txtType}
              >
                {getTextWithLocale(item?.type?.text)}
              </Text>
            </Box>
            <Box>
              {_.map(getOptions(item?.type?.options), (option, index) => (
                <Text
                  key={index}
                  style={styles.txtOption}
                >
                  {getTextWithLocale(option?.text)}
                </Text>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default WashingMachineDetail;
