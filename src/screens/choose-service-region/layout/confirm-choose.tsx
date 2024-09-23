/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-11 15:01:17
 * @modify date 2022-10-11 15:01:17
 * @desc [Choose service]
 */
import React from "react";
import _ from "lodash";

import { LocalizationContext } from "@src/libs/context";
import { Box, Text, Image, Alert, TransitionView } from "@src/components";

import styles from "./styles";
import { ScrollView, TouchableOpacity } from "react-native";
import { updateWorkingPlacesAndServicesAPI } from "@src/apis/user";
import {
  formatWorkingPlaces,
  handleError,
  IRespond,
  getCountry,
} from "@src/libs/helper";

const ConfirmScreen: React.FC<{
  getUserInfo?: any;
  citySelected?: any;
  districtSelected?: any;
  servicesByCity?: any;
  locale?: any;
  services?: any;
  setStep?: any;
  step?: any;
  getTrainingStep?: any;
}> = ({
  getUserInfo,
  locale,
  citySelected,
  services,
  servicesByCity,
  districtSelected,
  setStep,
  step,
  getTrainingStep,
}) => {
  const listService = _.filter(
    servicesByCity,
    (item) => services.indexOf(item?._id) >= 0
  );
  const I18n = React.useContext(LocalizationContext);

  const updateWorkingPlacesAndServices = async () => {
    const country = getCountry();
    const params = {
      serviceIds: services,
      workingPlaces: formatWorkingPlaces(
        districtSelected,
        country.isoCode,
        citySelected.name
      ),
    };
    const respond: IRespond = await updateWorkingPlacesAndServicesAPI(params);
    // success
    if (respond.isSuccess) {
      getUserInfo();
      getTrainingStep();
      return Alert.alert?.open({
        title: "DIALOG.TITLE_INFORMATION",
        message: (
          <Box alignCenter>
            <Text testID="txtUpdateSuccess">
              {I18n.t("CONFIRM_CHOOSE_WORKING_PLACE_AND_SERVICES.SAVE_SUCCESS")}
            </Text>
          </Box>
        ),
        actions: [
          {
            testID: "btnDone",
            text: "DIALOG.BUTTON_DONE",
          },
        ],
      });
    }
    handleError(respond?.error);
  };

  return (
    <TransitionView
      duration={300}
      animation="fadeIn"
      style={{ flex: 1 }}
    >
      <Box
        flex
        style={styles.container}
      >
        <ScrollView>
          <Box>
            <Box
              center
              style={styles.boxTitle}
            >
              <Text
                bold
                color="primary"
                fontSize="xl"
              >
                {I18n.t("CONFIRM_CHOOSE_WORKING_PLACE_AND_SERVICES.CONFIRM")}
              </Text>
              <Image
                source={require("@images/active-account/background-map.png")}
                style={styles.imageMap}
              />
              <Text>
                {I18n.t(
                  "CONFIRM_CHOOSE_WORKING_PLACE_AND_SERVICES.CONFIRM_NOTE"
                )}
              </Text>
            </Box>
            <Box style={styles.boxConfirmFooter}>
              <Box style={styles.boxContainerConfirmService}>
                <Text bold>
                  {I18n.t("CONFIRM_CHOOSE_WORKING_PLACE_AND_SERVICES.SERVICES")}
                </Text>
                <Box
                  row
                  style={styles.boxConfirmService}
                >
                  {listService.map((item, index) => (
                    <Box
                      key={index}
                      row
                      alignCenter
                      style={styles.boxConfirmItem}
                    >
                      <Text
                        testID={"service_" + item?.name}
                        color="primary"
                        bold
                      >
                        {item?.text[locale]}
                      </Text>
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box style={styles.boxContainerConfirmService}>
                <Text bold>
                  {I18n.t(
                    "CONFIRM_CHOOSE_WORKING_PLACE_AND_SERVICES.DISTRICTS"
                  )}
                </Text>
                <Box
                  row
                  style={styles.boxConfirmService}
                >
                  {districtSelected.map((item, index) => (
                    <Box
                      key={index}
                      row
                      alignCenter
                      style={styles.boxConfirmItem}
                    >
                      <Text
                        testID={"district_" + item}
                        color="primary"
                        bold
                      >
                        {item}
                      </Text>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </ScrollView>
        <Box row>
          <Box
            center
            style={styles.boxLeftButton}
          >
            <TouchableOpacity
              onPress={() => setStep(step - 1)}
              style={styles.leftButton}
            >
              <Text
                bold
                color="secondary"
              >
                {I18n.t("TASK_DETAIL.BUTTON_NO")}
              </Text>
            </TouchableOpacity>
          </Box>
          <Box
            center
            style={styles.boxRigthButton}
          >
            <TouchableOpacity
              testID="btnConfirm"
              onPress={() => updateWorkingPlacesAndServices()}
              style={styles.rigthButton}
            >
              <Text
                bold
                color="white"
              >
                {I18n.t("CONFIRM_CHOOSE_WORKING_PLACE_AND_SERVICES.CONFIRM")}
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </TransitionView>
  );
};
export default ConfirmScreen;
