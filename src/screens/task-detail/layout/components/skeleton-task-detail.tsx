import { Box, Card, Container, Skeleton } from "@src/components";
import SkeletonTaskItem from "components/task-item/components/skeleton-task-item/skeleton-task-item";
import { borderRadius, colors, spacing } from "libs/theme";
import { ScrollView } from "react-native";

function SkeletonTaskDetail() {
  return (
    <Container>
      <ScrollView>
        <Card style={{ marginTop: spacing.m }}>
          <SkeletonTaskItem />
          <Box
            row
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: spacing.m,
            }}
          >
            <Skeleton
              animation="pulse"
              height={20}
              width={80}
              style={{
                borderRadius: borderRadius.s,
              }}
            />
            <Skeleton
              animation="pulse"
              height={30}
              width={150}
              style={{
                borderRadius: borderRadius.s,
              }}
            />
            <Skeleton
              animation="pulse"
              height={25}
              width={25}
              style={{
                borderRadius: borderRadius.s,
              }}
            />
          </Box>
          <Box
            row
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Skeleton
              animation="pulse"
              height={20}
              width={120}
              style={{
                borderRadius: borderRadius.s,
              }}
            />
            <Skeleton
              animation="pulse"
              height={30}
              width={80}
              style={{
                borderRadius: borderRadius.s,
              }}
            />
          </Box>
          <Box
            row
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: spacing.m,
            }}
          >
            <Box
              row
              style={{ alignItems: "center" }}
            >
              <Skeleton
                animation="pulse"
                height={25}
                width={25}
                style={{
                  borderRadius: borderRadius.s,
                  marginRight: spacing.l,
                }}
              />
              <Skeleton
                animation="pulse"
                height={40}
                width={120}
                style={{
                  borderRadius: borderRadius.s,
                }}
              />
            </Box>
            <Skeleton
              animation="pulse"
              height={56}
              width={56}
              style={{
                borderRadius: borderRadius.s,
              }}
            />
          </Box>
          <Box
            row
            style={{ alignItems: "center", marginTop: spacing.m }}
          >
            <Skeleton
              animation="pulse"
              height={25}
              width={25}
              style={{
                borderRadius: borderRadius.s,
                marginRight: spacing.l,
              }}
            />
            <Skeleton
              animation="pulse"
              height={40}
              width={180}
              style={{
                borderRadius: borderRadius.s,
              }}
            />
          </Box>
          <Box
            row
            style={{ alignItems: "center", marginTop: spacing.m }}
          >
            <Skeleton
              animation="pulse"
              height={25}
              width={25}
              style={{
                borderRadius: borderRadius.s,
                marginRight: spacing.l,
              }}
            />
            <Skeleton
              animation="pulse"
              height={30}
              width={80}
              style={{
                borderRadius: borderRadius.s,
              }}
            />
          </Box>
          <Box
            style={{
              marginTop: spacing.m,
              paddingTop: spacing.m,
              borderTopColor: colors.grey3,
              borderTopWidth: 1,
            }}
          >
            <Skeleton
              animation="pulse"
              height={25}
              width={80}
              style={{
                borderRadius: borderRadius.s,
              }}
            />
            <Skeleton
              animation="pulse"
              height={25}
              style={{
                borderRadius: borderRadius.s,
                marginTop: spacing.m,
              }}
            />
            <Skeleton
              animation="pulse"
              height={25}
              width={80}
              style={{
                borderRadius: borderRadius.s,
                marginTop: spacing.m,
                alignSelf: "flex-end",
              }}
            />
          </Box>
        </Card>
        <Card>
          <Skeleton
            animation="pulse"
            height={40}
            style={{
              borderRadius: borderRadius.s,
              alignSelf: "center",
            }}
          />
          <Box
            row
            style={{
              justifyContent: "space-between",
              paddingHorizontal: spacing.xl,
              marginTop: spacing.m,
            }}
          >
            <Skeleton
              animation="pulse"
              height={70}
              width={70}
              style={{
                borderRadius: borderRadius.s,
                alignSelf: "center",
              }}
            />
            <Skeleton
              animation="pulse"
              height={70}
              width={70}
              style={{
                borderRadius: borderRadius.s,
                alignSelf: "center",
              }}
            />
            <Skeleton
              animation="pulse"
              height={70}
              width={70}
              style={{
                borderRadius: borderRadius.s,
                alignSelf: "center",
              }}
            />
          </Box>
          <Skeleton
            animation="pulse"
            height={50}
            style={{
              borderRadius: borderRadius.s,
              alignSelf: "center",
              marginTop: spacing.m,
            }}
          />
        </Card>
      </ScrollView>
    </Container>
  );
}

export default SkeletonTaskDetail;
