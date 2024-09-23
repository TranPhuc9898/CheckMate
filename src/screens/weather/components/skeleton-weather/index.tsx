/* eslint-disable react/react-in-jsx-scope */
import { Dimensions } from "react-native";

import { Box, Skeleton } from "@src/components";
import { borderRadius, spacing } from "libs/theme";

const { width, height } = Dimensions.get("window");

const HOURS = [1, 2, 3, 4];

function SkeletonWeather() {
  return (
    <Box
      style={{
        paddingTop: height * 0.175,
      }}
    >
      <Box center>
        <Skeleton
          animation="pulse"
          height={100}
          width={100}
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
            marginTop: spacing.l,
          }}
        />
        <Skeleton
          animation="pulse"
          height={spacing.xl}
          width={150}
          style={{
            borderRadius: borderRadius.s,
            marginTop: spacing.l,
          }}
        />
      </Box>
      <Box
        style={{
          marginTop: spacing.xxxl,
        }}
      >
        <Skeleton
          animation="pulse"
          height={spacing.xxl}
          width={100}
          style={{
            borderRadius: borderRadius.s,
            margin: spacing.l,
          }}
        />

        <Box row>
          {HOURS.map((item) => {
            return (
              <Skeleton
                key={item}
                animation="pulse"
                height={((width - spacing.l * 5) / 4) * 1.5}
                width={(width - spacing.l * 5) / 4}
                style={{
                  borderRadius: borderRadius.s,
                  marginLeft: spacing.l,
                }}
              />
            );
          })}
        </Box>
      </Box>

      <Box
        style={{
          marginTop: spacing.xxxl,
        }}
      >
        <Skeleton
          animation="pulse"
          height={spacing.xxl}
          width={100}
          style={{
            borderRadius: borderRadius.s,
            margin: spacing.l,
          }}
        />

        <Box>
          {HOURS.map((item) => {
            return (
              <Skeleton
                key={`day_${item}`}
                animation="pulse"
                height={height * 0.075}
                width={width - spacing.l * 2}
                style={{
                  borderRadius: borderRadius.s,
                  marginBottom: spacing.l,
                  marginHorizontal: spacing.l,
                }}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default SkeletonWeather;
