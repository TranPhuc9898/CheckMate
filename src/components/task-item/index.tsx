/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-13 14:36:20
 * @modify date 2023-03-16 14:36:20
 * @desc [Render task item]
 */

import { Card, Box, CardPremium } from "@src/components";
import {
  HeaderItem,
  FooterItem,
  Countdown,
  TaskDate,
} from "components/task-item/components";
import { TouchableOpacity } from "react-native";
import styles from "components/task-item/components/styles";
import { statusTask } from "libs/config";
import { navigateTo } from "libs/helper";
import { FC } from "react";
import _ from "lodash";

export interface ITaskItem {
  item: any;
  style?: any;
  index?: number;
  testID?: string;
  disabled?: boolean;
  disabledCard?: boolean;
}

const TaskItem: FC<ITaskItem> = ({
  item,
  index = 0,
  style,
  testID,
  disabled,
  disabledCard,
}) => {
  if (_.isEmpty(item)) return null;

  const {
    cost,
    date,
    reason,
    status,
    duration,
    district,
    cancelBy,
    ratingTip,
    isPremium,
    description,
    serviceText,
    requirements,
    paymentMethod,
    acceptedTasker,
  } = item;

  const isTaskConfirmed = Boolean(status === statusTask.confirmed || status === statusTask.done);

  const handleGoToTaskDetail = () => {
    navigateTo("TaskDetail", { taskId: item?._id });
  };

  const _RenderContent = () => (
    <Box>
      {/* Header */}
      <HeaderItem
        district={district}
        serviceText={serviceText}
        acceptedTasker={acceptedTasker}
      />
      {/* End header */}

      <TaskDate
        index={index}
        date={date}
        duration={duration}
      />

      {/* Content */}
      <Box
        row
        between
        alignCenter
        style={styles.rowStyle}
      ></Box>
      {/* End content */}
      {/* Footer */}
      <FooterItem
        testID={`cost_${index}`}
        cost={cost}
        paymentMethod={paymentMethod}
        requirements={requirements || []}
      />
      {/* End footer */}
    </Box>
  );

  const checkTaskPremium = () => {
    if (isPremium) {
      return (
        <CardPremium style={style}>
          <_RenderContent />
        </CardPremium>
      );
    }
    return (
      <Card style={[styles.cardStyle, style]}>
        <_RenderContent />
      </Card>
    );
  };

  if (disabledCard) {
    return <_RenderContent />;
  }

  return (
    <TouchableOpacity
      key={item?._id}
      disabled={disabled}
      testID={`${testID}_${description}`}
      onPress={handleGoToTaskDetail}
    >
      {checkTaskPremium()}
      {/* Countdown */}
      {isTaskConfirmed ? <Countdown date={date} status={status} /> : null}
    </TouchableOpacity>
  );
};

export default TaskItem;
