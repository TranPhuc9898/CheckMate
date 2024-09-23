/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-11 15:01:17
 * @modify date 2022-10-11 15:01:17
 * @desc [Choose service]
 */
import React from "react";
import { FlatList } from "react-native";
import _ from "lodash";

import { Box, CheckBox, ComingSoon, Text, TransitionView } from "@src/components";
import { useI18n } from "hooks/translation";
import { colors } from "libs/theme";

import NextStep from "./next-step";
import styles from "./styles";

const ChooseService: React.FC<{
  setChooseService: any;
  locale: any;
  getServicesByCity?: any;
  setServicesByCity?: any;
  servicesByCity?: any;
  citySelected: any;
  step?: any;
  setStep?: any;
  services?: any;
}> = ({
  setChooseService,
  locale,
  getServicesByCity,
  setServicesByCity,
  citySelected,
  step,
  setStep,
  services,
  servicesByCity,
}) => {
  const { t } = useI18n();
  // Initialize useState
  const [service, setService] = React.useState(services);

  const initData = async () => {
    const res = await getServicesByCity(citySelected?.name);
    if (res) {
      setServicesByCity(res);
    }
  };

  React.useEffect(() => {
    // Get data
    initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle choose service
  const handleChooseService = (item: string) => {
    const newService = _.cloneDeep(service);

    // Check item has exist
    const serviceIndex = _.findIndex(service, (element: string) => element === item);
    // if item is exist, replace item
    if (serviceIndex !== -1) {
      newService.splice(serviceIndex, 1);
    } else {
      // Data not exist, push new item to array
      newService.push(item);
    }

    setService(newService);
    setChooseService(newService);
  };

  // Render item FlatList
  const _renderItem = ({ item }) => {
    const picked = _.find(service, (element: string) => element === item._id);
    // Disabled các dịch vụ không chung group
    const _checkDisabled = () => {
      // Kiểm tra đã chọn dịch vụ nào hay chưa
      if (!service[0]) {
        return false;
      }
      // Tìm tên group dịch vụ đã chọn
      const { group } = _.find(servicesByCity, (serviceItem) => serviceItem._id === service[0]);
      // So sánh dịch vụ có trùng group với dịch vụ đã chọn chưa (Không trùng => disabled)
      if (group === item?.group) {
        return false;
      }
      return true;
    };

    return (
      <Box style={[styles.boxItemCheckbox2, picked ? { backgroundColor: colors.primary3 } : styles.isStyleInActive]}>
        <CheckBox
          // center
          testID={"service_" + item?.name}
          title={item?.text[locale]}
          checked={!_.isEmpty(picked)}
          onPress={() => handleChooseService(item._id)}
          textStyle={{ fontWeight: "normal" }}
          disabled={_checkDisabled()}
          containerStyle={[picked ? { backgroundColor: colors.primary3 } : {}]}
          size={18}
        />
      </Box>
    );
  };

  const _renderContent = () => {
    if (_.isEmpty(servicesByCity)) {
      return (
        <Box
          flex
          style={styles.container}
        >
          <ComingSoon />
        </Box>
      );
    }
    return (
      <>
        <FlatList
          data={servicesByCity}
          renderItem={_renderItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        />
        <NextStep
          step={step}
          setStep={setStep}
          disabled={_.isEmpty(service)}
        />
      </>
    );
  };

  return (
    <TransitionView
      duration={1000}
      animation="fadeIn"
      style={{ flex: 1 }}
    >
      <Box flex>
        <Box
          center
          style={styles.boxTitle}
        >
          <Text
            bold
            color="primary"
            fontSize="xl"
            center
          >
            {t("REGISTER_CHOOSE_SERVICES.CHOOSE_SERVICES")}
          </Text>
        </Box>
        {_renderContent()}
      </Box>
    </TransitionView>
  );
};
export default ChooseService;
