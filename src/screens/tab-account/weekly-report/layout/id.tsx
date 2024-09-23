import { ScrollView } from "react-native";
import HeaderHome from "@components/header-home";
import { Container } from "@src/components";
import Finance from "../components/report-detail";

const WeeklyReportScreen = (props: any) => {
  return (
    <Container>
      <ScrollView>
        <Finance {...props} />
      </ScrollView>
    </Container>
  );
};

export default WeeklyReportScreen;
