/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-19 10:15:27
 * @modify date 2022-10-19 10:15:27
 * @desc [Render skeleton my task]
 */
import { Box, Card, Skeleton } from "@src/components";
import SkeletonTaskItem from "components/task-item/components/skeleton-task-item/skeleton-task-item";
import { borderRadius, spacing } from "libs/theme";
import styles from "../layout/styles";

function SkeletonNewTasks() {
  return (
    <Box style={styles.containerSkeleton}>
      <Box
        row
        between
        alignCenter
        style={[styles.lastTaskContainer, { marginBottom: spacing.l }]}
      >
        <Skeleton
          animation="pulse"
          height={20}
          width={13}
          style={{
            borderRadius: borderRadius.s,
            marginLeft: spacing.l,
          }}
        />
        <Box
          row
          between
          alignCenter
        >
          <Skeleton
            animation="pulse"
            height={20}
            width={90}
            style={{
              borderRadius: borderRadius.s,
              marginHorizontal: spacing.l,
            }}
          />
          <Skeleton
            animation="pulse"
            height={20}
            width={100}
            style={{
              borderRadius: borderRadius.s,
              marginHorizontal: spacing.l,
            }}
          />
        </Box>
        <Skeleton
          animation="pulse"
          height={40}
          width={40}
          style={{
            borderRadius: borderRadius.s,
          }}
        />
      </Box>
      <Card>
        <SkeletonTaskItem />
      </Card>
      <Card>
        <SkeletonTaskItem />
      </Card>
      <Card>
        <SkeletonTaskItem />
      </Card>
    </Box>
  );
}

export default SkeletonNewTasks;
