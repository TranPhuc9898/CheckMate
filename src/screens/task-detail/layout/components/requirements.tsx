/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-15 10:26:24
 * @modify date 2022-10-15 10:26:24
 * @desc [Render requirements]
 */

import { Box, Button, Icon, Text } from "@src/components";
import React, { FC } from "react";
import _ from "lodash";
import { LocalizationContext } from "libs/context";
import { getTaskRequirements, navigateTo } from "libs/helper";
import styles from "../styles";

interface IRequirement {
  pet?: any;
  duration?: any;
  requirements?: any;
}

interface IItem {
  iconName: any;
  content: any;
  testID?: any;
  key?: any;
}

const Requirements: FC<IRequirement> = ({
  pet = [],
  duration,
  requirements = [],
}) => {
  const I18n = React.useContext(LocalizationContext);

  const RenderItem: FC<IItem> = ({ iconName, content, testID }) => {
    return (
      <Box
        row
        alignCenter
        style={styles.containerRequirement}
      >
        <Icon
          testID={testID}
          name={iconName}
          color="secondary"
        />
        <Box
          flex
          style={styles.boxContent}
        >
          <Text numberOfLines={1}>{content}</Text>
        </Box>
      </Box>
    );
  };

  // Render duration
  const _shouldRenderDuration = React.useMemo(() => {
    if (!duration || duration < 0) {
      return null;
    }
    return (
      <RenderItem
        testID={"iconClock"}
        iconName="clock"
        content={I18n.t("TASK_DETAIL.DURATION_NOTE", { duration: duration })}
      />
    );
  }, [duration]);

  // Render pet
  const _shouldRenderPet = React.useMemo(() => {
    if (_.isEmpty(pet)) {
      return null;
    }
    const pets = pet
      .map((pe) => {
        if (pe.name) {
          return I18n.t("TASK_DETAIL." + pe.name);
        }
        if (pe.other) {
          return pe.other;
        }
      })
      .join(", ");
    return (
      <RenderItem
        testID={"iconPet"}
        iconName="pet"
        content={pets}
      />
    );
  }, [pet]);

  // Render requirements
  const _shouldRenderRequirements = React.useMemo(() => {
    if (_.isEmpty(requirements)) {
      return null;
    }
    const requirementResult = getTaskRequirements(requirements) || [];
    return requirementResult.map((item) => {
      if (item?.name === "bringTools") {
        return (
          <Box
            row
            between
            alignCenter
            key={item?.name}
            style={styles.containerBringTools}
          >
            <Box
              row
              alignCenter
            >
              <Icon
                name={"bringTools"}
                color="secondary"
              />
            </Box>
            <Box
              flex
              style={styles.boxContent}
            >
              <Text numberOfLines={1}>
                {I18n.t("TASK_DETAIL." + item?.text)}
              </Text>
            </Box>
            <Button
              size="sm"
              onPress={() => navigateTo("ListOfToolForTasker")}
            >
              <Text
                bold
                fontSize="m"
                color="white"
                style={styles.txtDetail}
              >
                {I18n.t("TASK_DETAIL.BUTTON_SEE_LIST")}
              </Text>
            </Button>
          </Box>
        );
      }
      return (
        <RenderItem
          key={item?.name}
          testID={item?.name}
          iconName={item?.name}
          content={I18n.t("TASK_DETAIL." + item?.text)}
        />
      );
    });
  }, [requirements]);

  return (
    <Box>
      {_shouldRenderDuration}
      {_shouldRenderRequirements}
      {_shouldRenderPet}
    </Box>
  );
};

export default Requirements;
