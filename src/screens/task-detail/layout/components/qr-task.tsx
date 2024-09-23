import { Dimensions } from "react-native";
import React, { useContext } from "react";
// Components
import { Box, Card, Text } from "components";
// Other libs
import QRCode from "react-native-qrcode-svg";
// Styles
import styles from "../styles";
import { statusTask } from "libs/config";
import { LocalizationContext } from "libs/context";

interface IQRTaskDetail {
  status?: string;
  qrcodeData?: any;
}
const QRTaskDetail: React.FC<IQRTaskDetail> = ({ status, qrcodeData }) => {
  const I18n = useContext(LocalizationContext);
  if (status !== statusTask.confirmed) return null;
  return (
    <Card>
      <Box center>
        <Text bold>{I18n.t("TASK_DETAIL.QR_CODE")}</Text>
      </Box>
      <Box
        center
        margin="xxxl"
        style={styles.qrCode}
      >
        <QRCode
          size={Math.round(Dimensions.get("window").width / 1.8)}
          value={qrcodeData}
        />
      </Box>
    </Card>
  );
};

export default QRTaskDetail;
