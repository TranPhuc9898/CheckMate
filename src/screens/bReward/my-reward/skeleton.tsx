import { Box, Card, Skeleton } from "@src/components";
import { borderRadius, spacing } from "libs/theme";
import { Dimensions, ScrollView } from "react-native";
const { width } = Dimensions.get("window");
function SkeletonMyReward() {

  const _renderItem = () => {
    return (
      <Card style={{ marginVertical: spacing.m }}>
        <Box
          row
          alignCenter
        >
          {/* Skeleton Image */}
          <Skeleton
            animation="pulse"
            height={90}
            width={90}
            style={{
              borderRadius: borderRadius.s,
            }}
          />
          <Box
            flex
            margin="m"
            style={{
              justifyContent: "center",
            }}
          >
            <Skeleton
              animation="pulse"
              height={25}
              width={width / 3}
              style={{
                borderRadius: borderRadius.s,
                marginRight: spacing.l,
              }}
            />
            <Skeleton
              animation="pulse"
              height={22}
              width={width / 2}
              style={{
                borderRadius: borderRadius.s,
                marginTop: spacing.s,
              }}
            />
            <Skeleton
              animation="pulse"
              height={22}
              width={width / 2}
              style={{
                borderRadius: borderRadius.s,
                marginTop: spacing.s,
              }}
            />
          </Box>
        </Box>
      </Card>
    );
  }

  return (
    <ScrollView style={{
      marginTop: spacing.l
    }}>
      <_renderItem />
      <_renderItem />
      <_renderItem />
      <_renderItem />
      <_renderItem />
    </ScrollView>
  );
}

export default SkeletonMyReward;
