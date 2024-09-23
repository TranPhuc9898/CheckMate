import { ScrollView } from "react-native";
import { Container } from "@src/components";
import QRCode from "../components/top-up-code";

const TopUpDetailScreen = (props: any) => {
  return (
    <Container>
      <ScrollView>
        {/* ------------------------------ TOP UP DETAIL ----------------------------- */}
        <QRCode {...props} />
        {/* ---------------------------- END TOP UP DETAIL --------------------------- */}
      </ScrollView>
    </Container>
  );
};

export default TopUpDetailScreen;
