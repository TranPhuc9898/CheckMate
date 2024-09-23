/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-13 10:32:17
 * @modify date 2022-10-13 10:32:17
 * @desc [Show shopping time]
 */

import { FC, useContext } from "react";
import { Box, Icon, Text } from "@src/components";
import styles from "./styles";
import { LocalizationContext } from "libs/context";
import { capitalizedFirstStr, formatDate } from "libs/helper";

interface ILaundryDate {
  date?: Date;
  collectionDate?: Date;
}

const LaundryDate: FC<ILaundryDate> = ({ date, collectionDate }) => {
  const I18n = useContext(LocalizationContext);

  if (!date && !collectionDate) {
    return null;
  }

  return (
    <Box style={styles.container}>
      {/* Bring cleaning tool */}
      <Box
        row
        alignCenter
        style={styles.lineContainer}
      >
        <Box
          row
          alignCenter
          flex
        >
          <Icon
            name="clock"
            color="secondary"
            size="l"
          />
        </Box>
        <Box style={styles.boxDate}>
          {collectionDate ? (
            <Box style={styles.contentLine}>
              <Text fontSize="m">
                {I18n.t("LAUNDRY.COLLECTION_DATE")}
                <Text bold>
                  {capitalizedFirstStr(formatDate(collectionDate, "other"))}
                </Text>
              </Text>
            </Box>
          ) : null}
          {date ? (
            <Box style={styles.contentLine}>
              <Text fontSize="m">
                {I18n.t("LAUNDRY.RETURN_DATE")}
                <Text bold>
                  {capitalizedFirstStr(formatDate(date, "other"))}
                </Text>
              </Text>
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default LaundryDate;
