import { Container } from "@src/components";
import Employee from "../components/employee";

const ListEmployeeScreen = (props: any) => {
  return (
    <Container>
      {/* -------------------------------- EMPLOYEE -------------------------------- */}
      <Employee {...props} />
      {/* ------------------------------ END EMPLOYEE ------------------------------ */}
    </Container>
  );
};

export default ListEmployeeScreen;
