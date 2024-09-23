import { Box } from "components";
import styles from "./styles";

export default ({ process }) => {
  // process from 0-1
  if (process === 1) {
    return null;
  }
  const newProcess = process * 100;
  return (
    <Box style={styles.container}>
      <Box style={[styles.spin, { width: `${newProcess}%` }]}></Box>
    </Box>
  );
};
