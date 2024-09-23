import { Box, Icon, Text } from "components";
import { useI18n } from "hooks/translation";
import { VIETNAM } from "libs/constants";
import { getIsoCodeGlobal, navigateTo } from "libs/helper";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";
import styles from "../../styles";

const BCare = () => {
  const { t } = useI18n();
  const { user } = useSelector((state: RootState) => state.app);
  // Không hỗ trợ bCare cho account Company và các quốc gia ngoài VN
  if (getIsoCodeGlobal() !== VIETNAM || user?.isCompany || user?.isEmployee) {
    return null;
  }
  return (
    <Box
      row
      alignCenter
      style={styles.boxAnalytic}
    >
      <Icon
        name="bCare"
        color="primary"
      />
      <Box
        flex
        row
        style={styles.boxContent}
      >
        <Text>{t("TASK_DETAIL.ACCIDENT_INSURANCE")}</Text>
        <TouchableOpacity
          onPress={() => navigateTo("BCareDetail")}
        >
          <Icon
            name="faq"
            size="m"
            color="secondary"
            style={styles.textGray}
          />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};
export default BCare;
