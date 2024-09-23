import { Container } from "@src/components";
import Topup from "../components/topup-vn";

const TopupScreen = (props: any) => {
  return (
    <Container>
      {/* -------------------------------- TOPUP -------------------------------- */}
      <Topup {...props} />
      {/* ------------------------------ END TOPUP ------------------------------ */}
    </Container>
  );
};

export default TopupScreen;
