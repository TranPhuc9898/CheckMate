import { ScrollView } from "react-native";
import HeaderHome from "@components/header-home";
import { Container } from "@src/components";
import ReportDetail from "../components/task-history";
import IncomeInMonth from "../components/income-in-month";
import { spacing } from "libs/theme";

const IncomeDetailScreen = (props: any) => {
  return (
    <Container>
      <ScrollView contentContainerStyle={{paddingBottom: spacing.xxxl}}>
        {/* ------------------------------ INCOME MONTH ------------------------------ */}
        <IncomeInMonth {...props} />
        {/* ---------------------------- END INCOME MONTH ---------------------------- */}

        {/* ------------------------------ REPORT DETAIL ----------------------------- */}
        <ReportDetail {...props} />
        {/* ---------------------------- END REPORT DETAIL --------------------------- */}
      </ScrollView>
    </Container>
  );
};

export default IncomeDetailScreen;
