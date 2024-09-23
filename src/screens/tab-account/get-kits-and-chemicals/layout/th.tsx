import { Container } from "components";
import { spacing } from "libs/theme";
import { Platform, StyleSheet } from "react-native";
import KitsAndChemicalsTab from "../components/kitsandchemicals-tab";

const GetKitsAndChemicals = (props: any) => {
  return (
    <Container contentContainerStyle={styles.container}>
      <KitsAndChemicalsTab />
    </Container>
  );
};

export default GetKitsAndChemicals;
const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        marginTop: spacing.m,
      },
    }),
  },
});
