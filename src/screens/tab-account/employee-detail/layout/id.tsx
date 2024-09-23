import { ScrollView } from "react-native";
import HeaderHome from "@components/header-home";
import { Container } from "@src/components";
import EmployeeDetail from "../components/employee-detail";

const EmployeeDetailScreen = (props: any) => {
  return (
    <Container>
      <ScrollView>
        {/* ----------------------------- EMPLOYEE DETAIL ---------------------------- */}
        <EmployeeDetail {...props} />
        {/* --------------------------- END EMPLOYEE DETAIL -------------------------- */}
      </ScrollView>
    </Container>
  );
};

export default EmployeeDetailScreen;
