/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2023-03-17 09:44:51
 * @modify date 2023-03-17 09:44:51
 * @desc [Disinfection detail]
 */

import { FC, useContext } from "react";
import { Alert, Box, Button, Text } from "@src/components";
import { LocalizationContext } from "libs/context";
import styles from "./components/styles";
import { IDetailInfo } from "..";
import TypeHouse from "./components/type-house";

const DisinfectionDetail: FC<IDetailInfo> = ({ detail }) => {
  const I18n = useContext(LocalizationContext);

  const _openModal = () => {
    Alert.alert.open({
      title: "TASK_DETAIL.DISINFECTION_PROCEDURE",
      message: (
        <Box>
          <Text
            bold
            style={styles.lineContainer}
          >
            {I18n.t("TASK_DETAIL.DISINFECTION_PROCEDURE_CONTENT_TITLE")}
          </Text>
          <Text style={styles.spacingText}>
            {I18n.t("TASK_DETAIL.DISINFECTION_PROCEDURE_CONTENT_1")}
          </Text>
          <Text style={styles.spacingText}>
            {I18n.t("TASK_DETAIL.DISINFECTION_PROCEDURE_CONTENT_2")}
          </Text>
          <Text style={styles.spacingText}>
            {I18n.t("TASK_DETAIL.DISINFECTION_PROCEDURE_CONTENT_3")}
          </Text>
          <Text style={styles.spacingText}>
            {I18n.t("TASK_DETAIL.DISINFECTION_PROCEDURE_CONTENT_4")}
          </Text>
          <Text style={styles.spacingText}>
            {I18n.t("TASK_DETAIL.DISINFECTION_PROCEDURE_CONTENT_5")}
          </Text>
          <Text style={styles.spacingText}>
            {I18n.t("TASK_DETAIL.DISINFECTION_PROCEDURE_CONTENT_6")}
          </Text>
          <Text style={styles.spacingText}>
            {I18n.t("TASK_DETAIL.DISINFECTION_PROCEDURE_CONTENT_7")}
          </Text>
        </Box>
      ),
    });
  };

  return (
    <Box>
      {/* Type house */}
      <TypeHouse
        spaceText={detail?.spaceText}
        space={detail?.space || "home"}
      />
      {/* Modal disinfection spray process */}
      <Button
        title={I18n.t("TASK_DETAIL.DISINFECTION_PROCEDURE")}
        size="md"
        onPress={_openModal}
      />
    </Box>
  );
};

export default DisinfectionDetail;
