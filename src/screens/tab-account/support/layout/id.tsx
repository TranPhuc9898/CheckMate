import { ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Box, Button, Card, Container } from "components";
import { LocalizationContext } from "libs/context";
import ImageSupport from "../component/image-support";
import DurationSupport from "../component/duration-support";
import { IRespond, openUrl } from "libs/helper";
import getTaskerSupportInfoAPI from "apis/support";
import { store } from "redux/store";
import { setLoading } from "redux/slice/app-slice";
import _ from "lodash";

const CardSupport = () => {
  const I18n = useContext(LocalizationContext);
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
            textTimeWork={I18n.t("SUPPORT.TIME_DAILY_WORK")}
            textWeekend={I18n.t("SUPPORT.SUNDAY")}
          />
          {/* Button Hot Line */}
          <Box row>
            <Box flex>
              {_.isEmpty(
                dataRespond?.workingSchedulePersonnel?.phoneNumber
              ) ? null : (
                <Button
                  testID="btnCallSupport"
                  title={I18n.t("SUPPORT.SWITCH_BOARD")}
                  onPress={() => {
                    openUrl(
                      "tel:" +
                        dataRespond?.workingSchedulePersonnel?.phoneNumber
                    );
                  }}
                />
              )}
            </Box>
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
              {_.isEmpty(
                dataRespond?.workingSchedulePersonnel?.phoneNumber
              ) ? null : (
                <Button
                  testID="btnCallSupport"
                  title={I18n.t("SUPPORT.SWITCH_BOARD")}
                  onPress={() => {
                    openUrl(
                      "tel:" +
                        dataRespond?.workingSchedulePersonnel?.phoneNumber
                    );
                  }}
                />
              )}
            </Box>
          </Box>
        </Card>
      </ScrollView>
    </Container>
  );
};

export default CardSupport;
