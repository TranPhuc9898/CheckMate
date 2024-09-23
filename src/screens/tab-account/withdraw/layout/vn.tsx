import { ScrollView } from "react-native";
import { Container } from "@src/components";
import Withdraw from "../components/withdraw";
import { LINK_SUPPORT_ZALO } from "libs/constants";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";

const WithdrawScreen = (props: any) => {
  const { settingSystem } = useSelector((state: RootState) => state?.app);
  return (
    <Container>
      <ScrollView keyboardShouldPersistTaps={"handled"}>
        {/* -------------------------------- WITHDRAW -------------------------------- */}
        <Withdraw {...props} linkSupport={settingSystem?.support?.zalo || LINK_SUPPORT_ZALO} />
        {/* ------------------------------ END WITHDRAW ------------------------------ */}
      </ScrollView>
    </Container>
  );
};

export default WithdrawScreen;
