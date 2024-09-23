import { Box, Skeleton } from "@src/components";
import { borderRadius, colors, spacing } from "libs/theme";

function SkeletonTaskItem() {
  return (
    <>
      <Skeleton
        animation="pulse"
        height={15}
        width={50}
        style={{
          borderRadius: borderRadius.s,
          marginBottom: spacing.s,
        }}
      />
      <Box
        row
        style={{
          justifyContent: "space-between",
          marginBottom: spacing.m,
        }}
      >
        <Skeleton
          animation="pulse"
          height={spacing.xl}
          width={140}
          style={{
            borderRadius: borderRadius.s,
          }}
        />
        <Skeleton
          animation="pulse"
          height={spacing.xl}
          width={spacing.xl}
          style={{
            borderRadius: borderRadius.s,
          }}
        />
      </Box>
      <Box
        row
        style={{
          justifyContent: "space-between",
          marginBottom: spacing.m,
        }}
      >
        <Skeleton
          animation="pulse"
          height={spacing.xl}
          width={180}
          style={{
            borderRadius: borderRadius.s,
          }}
        />
        <Skeleton
          animation="pulse"
          height={spacing.xl}
          width={80}
          style={{
            borderRadius: borderRadius.s,
          }}
        />
      </Box>
      <Box
        row
        style={{
          paddingTop: spacing.m,
          borderTopColor: colors.grey3,
          borderTopWidth: 1,
        }}
      >
        <Skeleton
          animation="pulse"
          height={spacing.xl}
          width={spacing.xl}
          style={{
            borderRadius: borderRadius.s,
          }}
        />
        <Skeleton
          animation="pulse"
          height={spacing.xl}
          width={spacing.xl}
          style={{
            borderRadius: borderRadius.s,
            marginLeft: spacing.l,
          }}
        />
        <Skeleton
          animation="pulse"
          height={spacing.xl}
          width={spacing.xl}
          style={{
            borderRadius: borderRadius.s,
            marginLeft: spacing.l,
          }}
        />
        <Skeleton
          animation="pulse"
          height={spacing.xl}
          width={spacing.xl}
          style={{
            borderRadius: borderRadius.s,
            marginLeft: spacing.l,
          }}
        />
        <Skeleton
          animation="pulse"
          height={spacing.xl}
          width={spacing.xl}
          style={{
            borderRadius: borderRadius.s,
            marginLeft: spacing.l,
          }}
        />
      </Box>
    </>
  );
}

export default SkeletonTaskItem;
