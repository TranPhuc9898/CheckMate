import { Box, Card, Container, Text } from "components";
import { LocalizationContext } from "libs/context";
import { getTextWithLocale } from "libs/helper";
import { spacing } from "libs/theme";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";

const ListOfToolForTasker = () => {
  const I18n = useContext(LocalizationContext);
  const { settingSystem } = useSelector((state: RootState) => state?.app);
  if (!settingSystem?.listOfToolsForTaskerLocal) {
    return (
      <Container headerShow={true}>
        <Card flex>
          <Box
            flex
            center
          >
            <Text
              bold
              fontSize="xl"
            >
              {I18n.t("TOPUP.COMING_SOON")}
            </Text>
          </Box>
        </Card>
      </Container>
    )
  }
  const listOfToolsForTasker = getTextWithLocale(settingSystem?.listOfToolsForTaskerLocal);
  // const listOfToolsForTasker = "Chổi;Ki hốt rác;Cây lau nhà, xô;Khăn lông;Nước lau sàn;Vim bồn cầu;Nước lau kính;Bàn chải toilet"

  const array = listOfToolsForTasker.split(';');
  const items = array.map((tool, index) => (<Text style={{
    lineHeight: spacing.xxl
  }} key={index}>{`${index + 1}. ${tool}`}</Text>));

  return (
    <Container headerShow={true}>
      <Card flex>
        <Text center variant="h4">{I18n.t("TASK_DETAIL.TITLE_LIST_OF_TOOL_FOR_TASKER")}</Text>
        <Box margin="l">{items}</Box>
      </Card>
    </Container>
  )
};
export default ListOfToolForTasker;