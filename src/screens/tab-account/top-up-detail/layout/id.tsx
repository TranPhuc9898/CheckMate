import { ScrollView } from "react-native";
import { Container } from "@src/components";
import QRCode from "../components/top-up-code";
import TopUpMethod from "../components/top-up-method";

const TopUpDetailScreen = (props: any) => {
  return (
    <Container>
      <ScrollView>
        {/* ------------------------------ TOP UP DETAIL ----------------------------- */}
        <QRCode {...props} />
        {/* ---------------------------- END TOP UP DETAIL --------------------------- */}

        {/* ------------------------------ TOP UP METHOD ----------------------------- */}
        <TopUpMethod {...props} />
        {/* ---------------------------- END TOP UP METHOD --------------------------- */}
      </ScrollView>
    </Container>
  );
};

export default TopUpDetailScreen;
