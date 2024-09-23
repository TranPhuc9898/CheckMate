import { ScrollView } from "react-native";
import HeaderHome from "@components/header-home";
import { Container } from "@src/components";
import Premium from "../components/premium";

const PremiumDetailScreen = (props: any) => {
  return (
    <Container>
      <ScrollView>
        {/* --------------------------------- PREMIUM -------------------------------- */}
        <Premium {...props} />
        {/* ------------------------------- END PREMIUM ------------------------------ */}
      </ScrollView>
    </Container>
  );
};

export default PremiumDetailScreen;
