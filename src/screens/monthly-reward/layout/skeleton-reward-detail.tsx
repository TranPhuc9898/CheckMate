import { Box, Card, Container, Skeleton } from "@src/components";
import { borderRadius, spacing } from "libs/theme";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
function SkeletonRewardDetail() {
  return (
    <Container>
      <Card flex>
        <Box flex>
          {/* Skeleton Image */}
          <Box
            flex
            center
          >
            <Skeleton
              animation="pulse"
              height={Math.round((2 * width) / 3)}
              width={Math.round((2 * width) / 3)}
              style={{
                borderRadius: borderRadius.s,
              }}
            />
          </Box>
          <Box flex>
            <Box center>
              <Skeleton
                animation="pulse"
                height={25}
                width={100}
                style={{
                  borderRadius: borderRadius.s,
                  marginRight: spacing.l,
                }}
              />
              <Box style={{ paddingTop: spacing.xxxl }}>
                <Skeleton
                  animation="pulse"
                  height={25}
                  width={100}
                  style={{
                    borderRadius: borderRadius.s,
                    marginRight: spacing.l,
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}

export default SkeletonRewardDetail;
