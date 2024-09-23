/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-19 10:14:40
 * @modify date 2022-10-19 10:14:40
 * @desc [Render skeleton my task]
 */
import { Box, Card } from "components";
import SkeletonTaskItem from "components/task-item/components/skeleton-task-item/skeleton-task-item";
import { spacing } from "libs/theme";

function SkeletonMyTasks() {
  return (
    <Box style={{ paddingTop: spacing.l }}>
      <Card>
        <SkeletonTaskItem />
      </Card>
      <Card>
        <SkeletonTaskItem />
      </Card>
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

export default SkeletonMyTasks;
