import { Box, Button, Card, Container, Divider, Image, Text } from "components";
import { LocalizationContext } from "libs/context";
import DatePicker from "../components/date-picker";
import TimePicker from "../components/item-time";
import { useContext, useState } from "react";
import { ScrollView } from "react-native";
import { navigateTo } from "libs/helper";
import { colors } from "libs/theme";
import styles from "./styles";
import moment from "moment";

const timeOption = {
  morning: 9,
  afternoon: 14,
};

const NUMBER_OF_DATE_PICKER = 10;
const ChooseDateTimeAppointment = () => {
  // Nếu là ngày thường thì bỏ qua 2 ngày
  let offDate = 2;
  // Nếu là thứ 6 thì bỏ qua 4 ngày
  if (moment().isoWeekday() === 5) {
    offDate = 4;
  }
  // Nếu là thứ 7 thì bỏ qua 3 ngày
  if (moment().isoWeekday() === 6) {
    offDate = 3;
  }
  const [datePicked, setDatePicked] = useState(
    moment().add(offDate, "day").toDate()
  );
  const [timePicked, setTimePicked] = useState(timeOption.morning);
  const I18n = useContext(LocalizationContext);

  // Hiển thị danh sách ngày được chọn
  const _renderListDatePicker = () => {
    const listDate = [];

    for (let index = 0; index < NUMBER_OF_DATE_PICKER; index++) {
      listDate.push(
        <DatePicker
          date={moment()
            .add(offDate + index, "day")
            .toDate()}
          checkDisabled={_checkDisabled}
          onPress={setDatePicked}
          datePicked={datePicked}
          key={"date" + index}
        />
      );
    }
    return listDate;
  };

  // Kiểm tra nếu cuối tuần thì không cho qua bước tiếp theo
  const _checkDisabled = (date) => {
    if (moment(date).isoWeekday() === 6 || moment(date).isoWeekday() === 7) {
      return true;
    }
    return false;
  };
  // Chuyển qua nước chọn địa điểm
  const _handleNext = () => {
    const dateTimePicked = moment(datePicked)
      .hour(timePicked)
      .minute(0)
      .second(0);
    return navigateTo("ChoosePlaceAppointment", {
      dateTimePicked: dateTimePicked,
    });
  };

  return (
    <Container headerShow={true}>
      <Card flex>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box center>
            <Image
              source={require("assets/images/active-account/background-time.png")}
            />
            <Text variant="h2" testID="titleChooseDateTime">
              {I18n.t("PROCEDURE_ACTIVE_ACCOUNT.TITLE_SELECT_TIME")}
            </Text>
          </Box>
          <Box
            row
            style={styles.boxLabel}
          >
            <Text bold>{I18n.t("PROCEDURE_ACTIVE_ACCOUNT.LABEL_DATE")}</Text>
          </Box>
          <Box>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {_renderListDatePicker()}
            </ScrollView>
          </Box>
          <Divider
            width={1}
            color={colors.grey4}
            style={styles.dividerStyle}
          />
          <Box style={styles.boxLabel}>
            <Text bold>{I18n.t("PROCEDURE_ACTIVE_ACCOUNT.LABEL_TIME")}</Text>
            <Box
              row
              between
            >
              <TimePicker
                time={timeOption.morning}
                label={I18n.t("PROCEDURE_ACTIVE_ACCOUNT.MORNING_APPOINTMENT")}
                onPress={setTimePicked}
                timePicked={timePicked}
              />
              <TimePicker
                time={timeOption.afternoon}
                label={I18n.t("PROCEDURE_ACTIVE_ACCOUNT.AFTERNOON_APPOINTMENT")}
                onPress={setTimePicked}
                timePicked={timePicked}
              />
            </Box>
            <Box style={styles.boxNote}>
              <Text
                fontSize="m"
                color="grey0"
              >
                {I18n.t("PROCEDURE_ACTIVE_ACCOUNT.NOTE_SELECT_TIME")}
              </Text>
            </Box>
          </Box>
        </ScrollView>
        <Button
          testID="btnNext"
          onPress={_handleNext}
          style={styles.btnStyle}
          disabled={_checkDisabled(datePicked)}
          title={I18n.t("DIALOG.BUTTON_NEXT")}
        />
      </Card>
    </Container>
  );
};
export default ChooseDateTimeAppointment;
