import { ScrollView } from "react-native";
import { Container } from "@src/components";
import Withdraw from "../components/withdraw";

const WithdrawScreen = (props: any) => {
  return (
    <Container>
      <ScrollView keyboardShouldPersistTaps={"handled"}>
        {/* -------------------------------- WITHDRAW -------------------------------- */}
        <Withdraw {...props} />
        {/* ------------------------------ END WITHDRAW ------------------------------ */}
      </ScrollView>
    </Container>
  );
};

export default WithdrawScreen;
