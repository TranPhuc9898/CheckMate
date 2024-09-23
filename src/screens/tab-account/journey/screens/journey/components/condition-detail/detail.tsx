import { FC, useContext } from "react";
import { Box, Divider, Icon, Text } from "components";
import { formatDate, getTextWithLocale } from "libs/helper";
import { LocalizationContext } from "libs/context";
import styles from "./styles";
import _ from "lodash";

interface IRemainDetail {
  detail?: [any];
}

const statusTraining = {
  passed: "PASSED",
  incomplete: "INCOMPLETE"
}

const Detail: FC<IRemainDetail> = ({ detail }) => {

  const I18n = useContext(LocalizationContext);

  const _renderItem = (item, index) => {
    // Nếu không có cả value và status thì return null
    if (!item?.value && !item?.status && !item?.date) {
      return null;
    }
    // Hiển thị text theo status hoặc theo value
    const _renderText = () => {
      if (item?.status === statusTraining.passed) {
        return (
          <Text
            bold
            color="success"
            testID={`txtSuccess_${index}`}
          >
            {I18n.t("JOURNEY.TRAINING_PASSED")}
          </Text>
        );
      }
      if (item?.status === statusTraining.incomplete) {
        return <Text bold color="grey3">{I18n.t("JOURNEY.TRAINING_INCOMPLETE")}</Text>;
      }
      return <Text bold color="primary">{item?.value || formatDate(item?.date, "date")}</Text>;
    };
    // Hiển thị rating nếu chưa điểm Rating chưa đạt
    if (item?.key === "AVG_RATING") {
      return (
        <Box key={"detail_" + index}>
          <Box
            row
            between
            alignCenter
            style={styles.wrapItemRemain}
          >
            <Box flex style={styles.wrapTxt}>
              <Text numberOfLines={2}>{getTextWithLocale(item?.text)}</Text>
            </Box>
            <Box row alignCenter>
              <Icon
                name="warning"
                color="warning"
                size="m"
              />
              <Text bold color="warning" style={styles.txtWarning}>{item?.value}</Text>
            </Box>
          </Box>
          {/* Nếu là phần tử cuối thì không show Divider */}
          {index < detail?.length - 1 && <Divider style={styles.dividerDetailStyle} />}
        </Box>
      )
    }
    // Hiên thị thông tin khác
    return (
      <Box key={"detail_" + index}>
        <Box
          row
          between
          alignCenter
          style={styles.wrapItemRemain}
        >
          <Box flex style={styles.wrapTxt}>
            <Text numberOfLines={2}>{getTextWithLocale(item?.text)}</Text>
          </Box>
          <Box>{_renderText()}</Box>
        </Box>
        {/* Nếu là phần tử cuối thì không show Divider */}
        {index < detail?.length - 1 && <Divider style={styles.dividerDetailStyle} />}
      </Box>
    )
  };

  if (_.isEmpty(detail)) {
    return null;
  }

  return (
    <Box>
      <Box
        flex
        style={styles.wrapRemain}
      >
        {detail?.map((item, index) => (_renderItem(item, index)))}
      </Box>
    </Box>
  )
};
export default Detail;