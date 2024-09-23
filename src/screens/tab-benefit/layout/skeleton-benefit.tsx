import { Box, Skeleton, Card } from "@src/components";
import { borderRadius, colors, spacing } from "libs/theme";

function SkeletonTaskItem() {
  const ItemBenefit = () => {
    return (
      <Card style={{ width: "40%", height: 200, alignItems: "center" }}>
        <Skeleton
          animation="pulse"
          height={80}
          width={80}
          style={{
            borderRadius: 180,
          }}
        />
        <Skeleton
          animation="pulse"
          height={spacing.xl}
          width={80}
          style={{
            borderRadius: borderRadius.s,
            marginTop: spacing.xl,
          }}
        />
        <Skeleton
          animation="pulse"
          height={spacing.l}
          width={120}
          style={{
            borderRadius: borderRadius.s,
            marginTop: spacing.m,
          }}
        />
        <Skeleton
          animation="pulse"
          height={spacing.l}
          width={120}
          style={{
            borderRadius: borderRadius.s,
            marginTop: spacing.s,
          }}
        />
      </Card>
    );
  };
  return (
    <>
      <Card>
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
      </Card>
      <Box
        row
        center
      >
        <ItemBenefit />
        <ItemBenefit />
      </Box>
      <Box
        row
        center
      >
        <ItemBenefit />
        <ItemBenefit />
      </Box>
    </>
  );
}

export default SkeletonTaskItem;
