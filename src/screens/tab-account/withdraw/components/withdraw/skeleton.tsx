import { Card, Box, Skeleton } from "@src/components";
import { borderRadius, colors, spacing } from "libs/theme";

function SkeletonTaskItem() {
  return (
    <>
      <Card>
        <Box
          center
          style={{ marginVertical: spacing.xl }}
        >
          <Skeleton
            animation="pulse"
            height={spacing.xxxl}
            width={100}
            style={{
              borderRadius: borderRadius.s,
              marginBottom: spacing.s,
            }}
          />
        </Box>
        <Skeleton
          animation="pulse"
          height={spacing.xl}
          width={100}
          style={{
            borderRadius: borderRadius.s,
            marginBottom: spacing.s,
          }}
        />

        <Skeleton
          animation="pulse"
          height={spacing.xl}
          width={120}
          style={{
            marginBottom: spacing.m,
            borderRadius: borderRadius.s,
          }}
        />

        <Box
          row
          style={{ justifyContent: "space-between", marginTop: spacing.l }}
        >
          <Skeleton
            animation="pulse"
            height={spacing.xl}
            width={170}
            style={{
              borderRadius: borderRadius.s,
              marginBottom: spacing.s,
            }}
          />
          <Skeleton
            animation="pulse"
            height={spacing.xl}
            width={80}
            style={{
              borderRadius: borderRadius.s,
              marginBottom: spacing.s,
            }}
          />
        </Box>

        <Box
          row
          style={{ justifyContent: "space-between" }}
        >
          <Skeleton
            animation="pulse"
            height={spacing.xl}
            width={150}
            style={{
              borderRadius: borderRadius.s,
              marginBottom: spacing.s,
            }}
          />
          <Skeleton
            animation="pulse"
            height={spacing.xl}
            width={100}
            style={{
              borderRadius: borderRadius.s,
              marginBottom: spacing.s,
            }}
          />
        </Box>

        <Box
          center
          style={{ marginTop: spacing.xl, marginBottom: spacing.s }}
        >
          <Skeleton
            animation="pulse"
            height={40}
            width={160}
            style={{
              borderRadius: borderRadius.s,
              marginBottom: spacing.s,
            }}
          />
        </Box>
      </Card>
    </>
  );
}

export default SkeletonTaskItem;
