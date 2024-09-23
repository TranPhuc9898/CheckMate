import getCompanyAddressAPI from "@src/apis/training-input/get-company-address";
import {
  Box,
  Button,
  Card,
  CheckBox,
  Container,
  Image,
  Text,
} from "components";
import { useContext, useEffect, useState } from "react";
import { LocalizationContext } from "libs/context";
import { FlatList, TouchableOpacity } from "react-native";
import { handleError, IRespond } from "libs/helper";
import styles from "./styles";
import { colors } from "libs/theme";
import { updateTaskerProfileAPI } from "apis/user";
import { IParamMakeAppointment } from "apis/user/update-tasker-profile";
import moment from "moment";

const ChoosePlaceAppointment = ({ navigation, route }) => {
  const I18n = useContext(LocalizationContext);
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null);
  const { dateTimePicked } = route.params;

  useEffect(() => {
    const initData = async () => {
      const respond: IRespond = await getCompanyAddressAPI();
      if (respond.isSuccess) {
        setData(respond.data);
        return;
      }
      handleError(respond?.error);
    };
    // Get info address
    initData();
    return () => {};
  }, []);

  const _handlePicked = (item) => {
    if (selected?.name === item.name) {
      return setSelected(null);
    }
    return setSelected(item);
  };

  const _renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => _handlePicked(item)}
      style={[
        styles.containerPlace,
        selected?.name === item.name ? styles.pickedStyle : null,
      ]}
    >
      <Box
        row
        flex
      >
        <CheckBox
          testID={`checkbox_${index}`}
          size={18}
          checked={Boolean(item.name === selected?.name)}
          onPress={() => _handlePicked(item)}
          containerStyle={[
            styles.containerCheckBox,
            {
              backgroundColor:
                selected?.name === item.name
                  ? colors.secondary3
                  : colors.background,
            },
          ]}
        />
        <Box
          flex
          style={styles.boxPlace}
        >
          <Text bold>{item.name}</Text>
          <Text style={styles.txtStyle}>{item.address}</Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );

  const _handleConfirm = async () => {
    let appointment: IParamMakeAppointment = Object.assign({}, selected);
    appointment.date = moment(dateTimePicked).utc().format();
    const result: IRespond = await updateTaskerProfileAPI({
      appointmentInfo: appointment,
    });
    if (result.isSuccess) {
      return navigation.popToTop();
    }
    return handleError(result?.error);
  };

  return (
    <Container headerShow={true}>
      <Card flex>
        <Box flex>
          <Box
            center
            style={styles.containerHeader}
          >
            <Box style={styles.boxImage}>
              <Image
                source={require("assets/images/active-account/background-map.png")}
                style={styles.imageStyle}
              />
            </Box>
            <Text variant="h2" testID="titleChooseAddress">
              {I18n.t("PROCEDURE_ACTIVE_ACCOUNT.TITLE_SELECT_PLACE")}
            </Text>
          </Box>
          <FlatList
            data={data}
            renderItem={_renderItem}
            keyExtractor={(item, index) => "place_" + index}
            contentContainerStyle={styles.contentContainerStyle}
          />
        </Box>
        <Button
          testID="btnConfirm"
          style={styles.btnStyle}
          onPress={_handleConfirm}
          disabled={Boolean(!selected)}
          title={I18n.t("DIALOG.BUTTON_CONFIRM")}
        />
      </Card>
    </Container>
  );
};
export default ChoosePlaceAppointment;
