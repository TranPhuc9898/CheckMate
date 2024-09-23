import { ScrollView } from "react-native";
import { Container } from "@src/components";
import UserInfo from "../components/user-info";
import QRCode from "../components/qr-identifier";
import Logout from "../components/log-out";
import ListEmployee from "../components/list-employee";
import ChangePassword from "../components/change-password";

const PersonalProfileScreen = (props: any) => {
  return (
    <Container >
      <ScrollView testID="ProfileDetail"  contentContainerStyle={{paddingBottom:70}}>
        {/* ---------------------------------- INFO ---------------------------------- */}
        <UserInfo {...props} />
        {/* -------------------------------- END INFO -------------------------------- */}

        {/* ------------------------------ LIST EMPLOYEE ----------------------------- */}
        <ListEmployee {...props} />
        {/* ---------------------------- END LIST EMPLOYEE --------------------------- */}

        {/* ------------------------------ REFERRAL CODE ----------------------------- */}
        <QRCode {...props} />
        {/* ---------------------------- END REFERRAL CODE --------------------------- */}

        {/* ---------------------------- CHANGE PASSWORD ---------------------------- */}
        <ChangePassword {...props} />
        {/* -------------------------- END CHANGE PASSWORD ----------------------------*/}

        {/* --------------------------------- LOGOUT --------------------------------- */}
        <Logout {...props} />
        {/* ------------------------------- END LOGOUT ------------------------------- */}
      </ScrollView>
    </Container>
  );
};

export default PersonalProfileScreen;
