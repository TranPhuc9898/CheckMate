import React, {
  FunctionComponent,
  ComponentProps,
  useEffect,
  useState,
  useContext,
} from "react";
import _ from "lodash";
import { TouchableOpacity, View } from "react-native";
import { LocalizationContext } from "@src/libs/context";
import { Alert, Box, Text, Icon, Button } from "@src/components";
import {
  callSupport,
  getLocaleGlobal,
  IRespond,
  handleError,
} from "libs/helper";
import { updateFreeScheduleAPI } from "apis/user";
import styles from "./styles";
import moment from "moment";
import { store } from "redux/store";
const LIST_SCHEDULE = [1, 2, 3, 4, 5, 6, 0];
const LIST_TIME_WORK = [
  {
    key: "morning",
    title: "MORNING",
    value: 8128,
  },
  {
    key: "afternoon",
    title: "AFTERNOON",
    value: 516096,
  },
  {
    key: "evening",
    title: "EVENING",
    value: 16252928,
  },
];

const DEFAULT_FREE_SCHEDULE = {
  "0": 16777216,
  "1": 16777216,
  "2": 16777216,
  "3": 16777216,
  "4": 16777216,
  "5": 16777216,
  "6": 16777216,
};
interface IFreeSchedule extends ComponentProps<typeof View> {
  getUserInfo: () => void;
  setLoading?: (isloading: boolean) => void;
  user?: any;
}

const FreeScheduleScreen: FunctionComponent<IFreeSchedule> = ({
  setLoading,
  getUserInfo,
  user,
}) => {
  const I18n = useContext(LocalizationContext);
  const locale = getLocaleGlobal();
  const [freeSchedule, setFreeSchedule] = useState(DEFAULT_FREE_SCHEDULE);

  // Check your free time for the day
  // ArrayBinarySchedule = [1000000000000000000000000]  (25 number in array)
  // ArrayBinarySchedule [1] = 23 o'clock  --  ArrayBinarySchedule [24] = 0 o'clock
  const checkTimeWork = (decimal) => {
    let morning,
      afternoon,
      evening = false;
    // converter decimal number to binary number
    const binaryNumber = parseInt(decimal, 10).toString(2);
    let arrFreeScheduleBinary = [];
    const arrayBinary = binaryNumber.split("").map((x) => Number(x));
    arrayBinary.map((data, index) => {
      if (data && index !== 0) {
        arrFreeScheduleBinary.push(24 - index);
      }
    });
    // 1000000111110111110000000
    // 1000000111111000001000000
    // check is morning working ?
    [12, 11, 10, 9, 8, 7, 6].some((e) => {
      morning = arrFreeScheduleBinary.includes(e);
      return morning;
    });
    // check is afternoon working ?
    [18, 17, 16, 15, 14, 13].some((e) => {
      afternoon = arrFreeScheduleBinary.includes(e);
      return afternoon;
    });
    // check is evening working ?
    [22, 21, 20, 19].some((e) => {
      evening = arrFreeScheduleBinary.includes(e);
      return evening;
    });
    return { morning, afternoon, evening };
  };

  const onChangeWorkingTime = (
    decimal: number,
    day: number,
    decimalOfWorkingTime: number,
    isActive: boolean
  ) => {
    /* ------------------- Chỉ cho phép update lịch rảnh 1 lần ------------------ */
    /* ----------------- Nếu muốn update lại thì liên hệ bTaskee ---------------- */
    if (user.freeSchedule) {
      // Get phone number from setting system
      const taskerSupportPhone = store.getState().app?.settingSystem?.taskerSupportPhone;
      return Alert.alert.open({
        title: "DIALOG.TITLE_INFORMATION",
        message: "SETTINGS.NOTE_TASKER_UPDATE_SCHEDULE",
        actions: [
          { text: "DIALOG.BUTTON_CLOSE", style: "cancel" },
          {
            text: "DIALOG.BUTTON_CALL_SUPPORT",
            onPress: () => {
              Alert.alert.close();
              callSupport(taskerSupportPhone);
            },
          },
        ],
      });
    }

    let cloneFreeSchedule = _.cloneDeep(freeSchedule);
    const currentSchedule = decimal;

    if (isActive) {
      const chooseSchedule = currentSchedule | decimalOfWorkingTime;
      cloneFreeSchedule[day] = chooseSchedule ^ decimalOfWorkingTime;
    } else {
      cloneFreeSchedule[day] = currentSchedule | decimalOfWorkingTime;
    }
    setFreeSchedule(cloneFreeSchedule);
  };

  const updateFreeSchedule = async () => {
    setLoading(true);
    const respond: IRespond = await updateFreeScheduleAPI({
      freeSchedule,
    });
    setLoading(false);

    if (respond.isSuccess) {
      getUserInfo();
      return Alert.alert.open({
        title: "DIALOG.TITLE_INFORMATION",
        message: "DIALOG.UPDATE_SUCCESS",
      });
    }
    handleError(respond?.error);
  };

  useEffect(() => {
    user?.freeSchedule && setFreeSchedule(user?.freeSchedule);
  }, []);

  const RenderSchedule = ({ index }) => {
    const decimal = freeSchedule[index];
    const timeWork = checkTimeWork(decimal);
    return (
      <Box row>
        <Box
          center
          style={styles.boxWeekday}
        >
          <Text
            bold
            color="primary"
          >
            {moment().isoWeekday(index).locale(locale).format("ddd")}
          </Text>
        </Box>
        <Box
          row
          style={styles.boxSchedule}
        >
          {LIST_TIME_WORK.map((item) => (
            <TouchableOpacity
              testID={`${index}-${item.key}`}
              onPress={() =>
                onChangeWorkingTime(
                  decimal,
                  index,
                  item.value,
                  timeWork[item.key]
                )
              }
              key={item.key}
              style={[
                styles.boxItemSchedule,
                timeWork[item.key] ? styles.boxItemScheduleActive : {},
              ]}
            >
              <Text
                fontSize="m"
                numberOfLines={1}
                // bold
              >
                {I18n.t(`SETTINGS.${item.title}`)}
              </Text>
            </TouchableOpacity>
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      <Box
        row
        center
        style={styles.boxIteam}
      >
        <Text
          bold
          color="primary"
          fontSize="xl"
        >
          {I18n.t("SETTINGS.FEE_SCHEDULE")}
        </Text>
      </Box>
      <Box>
        {LIST_SCHEDULE.map((index) => (
          <RenderSchedule
            key={index}
            index={index}
          />
        ))}
      </Box>
      <Box>
        <Box
          row
          style={styles.boxNote}
        >
          <Icon
            name="help"
            color="primary"
          />
          <Box style={styles.textNote}>
            <Text color="primary">
              {I18n.t("SETTINGS.NOTE_TASKER_UPDATE_SCHEDULE")}
            </Text>
          </Box>
        </Box>
        <Box
          row
          style={styles.boxBottom}
        >
          <Box style={styles.boxWorktime} />
          <Box center>
            <Text>{I18n.t("SETTINGS.YOUR_WORKTIME")}</Text>
          </Box>
        </Box>
        <Box
          row
          style={styles.boxBottom}
        >
          <Box style={styles.boxBusyTime} />
          <Box center>
            <Text>{I18n.t("SETTINGS.BUSY_TIME")}</Text>
          </Box>
        </Box>
      </Box>

      {/* ------------- Nếu không có thay đổi thì không hiện nút update ------------ */}
      {!_.isEqual(user.freeSchedule, freeSchedule) ? (
        <Box style={styles.boxUpdate}>
          <Button
            disabled={_.isEqual(freeSchedule, DEFAULT_FREE_SCHEDULE)}
            onPress={updateFreeSchedule}
            title={I18n.t("SETTINGS.UPDATE")}
          />
        </Box>
      ) : null}
    </Box>
  );
};

export default FreeScheduleScreen;
