import { ScrollView, TouchableOpacity } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Box, Button, Card, Container, Icon } from "components";
import { LocalizationContext } from "libs/context";
import ImageSupport from "../component/image-support";
import DurationSupport from "../component/duration-support";
import { IRespond, openUrl } from "libs/helper";
import getTaskerSupportInfoAPI from "apis/support";
import styles from "./styles";
import {
  LINK_SUPPORT_LINE_THAI,
  LINK_SUPPORT_LINE_THAI_RECRUITMENT,
} from "libs/constants";
import { store } from "redux/store";
import { setLoading } from "redux/slice/app-slice";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";

const CardSupport = () => {
  const I18n = useContext(LocalizationContext);
  const { settingSystem } = useSelector((state: RootState) => state?.app);
  const [dataRespond, setDataRespond] = useState<any>({});

  const getTaskerSupportInfo = async () => {
    await store.dispatch(setLoading(true));
    const respond: IRespond = await getTaskerSupportInfoAPI();
    await store.dispatch(setLoading(false));
    if (respond?.isSuccess) {
      setDataRespond(respond.data);
    }
  };
  useEffect(() => {
    getTaskerSupportInfo();
  }, []);

  return (
    <Container>
      <ScrollView testID="scrollViewSupport">
        <Card>
          {/* Image  */}
          <ImageSupport
            image={require("@images/support/supportDaily.png")}
            textSupport={I18n.t("SUPPORT.TITLE_DAILY_WORK")}
          />
          {/* Time  Thứ 2 - Thứ 7:  Chủ nhật*/}
          <DurationSupport
            data={dataRespond?.workingSchedule}
            textTimeWork={I18n.t("SUPPORT.TIME_PERSONNEL_WORK")}
            textWeekend={I18n.t("SUPPORT.SATURDAY") + " - " + I18n.t("SUPPORT.SUNDAY")}
          />
          {/* Button Hot Line */}
          <Box row>
            <Box flex>
              <Button
                testID="btnCallSupport"
                title={I18n.t("SUPPORT.SWITCH_BOARD")}
                onPress={() => {
                  openUrl(`tel:${dataRespond?.workingSchedule?.phoneNumber}`);
                }}
              />
            </Box>
            <TouchableOpacity
              testID="btnLine"
              style={styles.btnHotLine}
              onPress={() => {
                openUrl(settingSystem?.supports?.line || LINK_SUPPORT_LINE_THAI);
              }}
            >
              {/* Icon Social  */}
              <Icon
                name={"line"}
                color="primary"
                size="xxl"
              />
            </TouchableOpacity>
          </Box>
        </Card>

        <Card>
          {/* Image  */}
          <ImageSupport
            image={require("@images/support/supportPersonnel.png")}
            textSupport={I18n.t("SUPPORT.TITLE_PERSONNEL_WORK")}
            textExtraSupport={I18n.t("SUPPORT.TITLE_PERSONNEL_WORK2")}
          />
          {/* Time  Thứ 2 - Thứ 6:  Thứ 7*/}
          <DurationSupport
            data={dataRespond.workingSchedulePersonnel}
            textTimeWork={I18n.t("SUPPORT.TIME_PERSONNEL_WORK")}
            textWeekend={I18n.t("SUPPORT.SATURDAY")}
            forHR={true}
          />
          {/* Button Hot Line */}
          <Box row>
            <Box flex>
              <Button
                testID="btnCallSupport_1"
                title={I18n.t("SUPPORT.SWITCH_BOARD")}
                onPress={() => {
                  openUrl(
                    `tel:${dataRespond?.workingSchedulePersonnel?.phoneNumber}`
                  );
                }}
              />
            </Box>
            <TouchableOpacity
              testID="btnLine_1"
              style={styles.btnHotLine}
              onPress={() => {
                openUrl(settingSystem?.supports?.lineRecruitment || LINK_SUPPORT_LINE_THAI_RECRUITMENT);
              }}
            >
              {/* Icon Social  */}
              <Icon
                name={"line"}
                color="primary"
                size="xxl"
              />
            </TouchableOpacity>
          </Box>
        </Card>
      </ScrollView>
    </Container>
  );
};

export default CardSupport;
