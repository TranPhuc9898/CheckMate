/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-13 10:32:17
 * @modify date 2022-10-13 10:32:17
 * @desc [Show info accepted tasker]
 */

import { FC, useContext } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Icon,
  PriceItem,
  Text,
} from "@src/components";
import styles from "./styles";
import { LocalizationContext } from "libs/context";
import _ from "lodash";
import { TouchableOpacity } from "react-native";
import { getUserIdGlobal } from "libs/helper";
import { CASH } from "libs/constants";
import ContentModalCall from "screens/task-detail/layout/components/content-modal-call";
import { statusTask } from "libs/config";

interface IInfoTaskerAccepted {
  paymentMethod: string;
  acceptedTasker: Array<any>;
  detail: any;
  status?: string;
}

const InfoTaskerAccepted: FC<IInfoTaskerAccepted> = ({
  paymentMethod,
  acceptedTasker,
  detail,
  status,
}) => {
  // Nếu không có accepted Tasker hoặc không phải task Waiting hay Confirmed -> return null
  if (_.isEmpty(acceptedTasker) || Boolean(status !== statusTask.confirmed && status !== statusTask.waiting)) {
    return null;
  }

  const I18n = useContext(LocalizationContext);
  const numberTaskerAccepted: any = acceptedTasker?.length || 0;
  const { numberOfTaskersDeepCleaning, numberOfTaskers } = detail;

  const numberTasker = numberOfTaskersDeepCleaning || numberOfTaskers;

  // Kiểm tra thông tin tasker trong danh sách
  const myInfo = acceptedTasker.find(
    (tasker) => tasker.taskerId === getUserIdGlobal()
  );

  const _openModal = () => {
    // Nếu tasker là member
    let myTask = (
      <Box>
        <Text
          bold
          center
          style={styles.titleModal}
        >
          {I18n.t("TASK_DETAIL.YOU_ARE_MEMBER")}
        </Text>
        <Box>
          <Text style={[styles.lineHeight, styles.lineContainer]}>
            {I18n.t("TASK_DETAIL.WORK_ACCORDING_TO_ASSIGNMENT")}
          </Text>
          <Text style={[styles.lineHeight, styles.lineContainer]}>
            {I18n.t("TASK_DETAIL.PLEASE_CANCEL_TASK_BEFORE_A_TIME", { t: 8 })}
          </Text>
          <Text style={[styles.lineHeight, styles.lineContainer]}>
            {paymentMethod === CASH
              ? I18n.t("TASK_DETAIL.RECEIVE_CASH")
              : I18n.t("TASK_DETAIL.OTHER_PAYMENT")}
          </Text>
        </Box>
      </Box>
    );
    // Nếu tasker là Leader
    if (myInfo?.isLeader) {
      myTask = (
        <Box>
          <Text
            bold
            center
            style={styles.titleModal}
          >
            {I18n.t("TASK_DETAIL.YOU_ARE_LEADER")}
          </Text>
          <Box>
            <Text style={[styles.lineHeight, styles.lineContainer]}>
              {I18n.t("TASK_DETAIL.NEED_TO_CONTACT_PARTNER")}
            </Text>
            <Text style={[styles.lineHeight, styles.lineContainer]}>
              {I18n.t("TASK_DETAIL.PLEASE_CANCEL_TASK_BEFORE_A_TIME", { t: 8 })}
            </Text>
            <Text style={[styles.lineHeight, styles.lineContainer]}>
              {I18n.t("TASK_DETAIL.DIVIDE_WORK")}
            </Text>
            <Text style={[styles.lineHeight, styles.lineContainer]}>
              {paymentMethod === CASH
                ? I18n.t("TASK_DETAIL.RECEIVE_CASH")
                : I18n.t("TASK_DETAIL.OTHER_PAYMENT")}
            </Text>
          </Box>
        </Box>
      );
    }
    // Show alert
    Alert.alert.open({
      title: "TASK_DETAIL.YOUR_WORK",
      message: myTask,
    });
  };

  const _onCall = (phone: string, isLeader: boolean) => {
    return Alert.alert.open({
      title: isLeader ? "TASK_DETAIL.CALL_WITH_LEADER" : "TASK_DETAIL.CALL_WITH_MEMBER",
      message: <ContentModalCall phone={phone} />,
      actions: null,
    });
  };

  // Check show button call
  const checkShowButtonCall = (tasker: any, testID: string) => {
    // Kiểm tra tasker
    if (
      // Có số điện thoại
      tasker?.phone &&
      // Không phải chính nó
      tasker?.taskerId !== getUserIdGlobal() &&
      // Nếu là leader thì show button gọi cho member
      // Nếu là member thì chỉ show button gọi cho leader
      tasker?.isLeader !== myInfo?.isLeader
    ) {
      return (
        <Button
          testID={testID}
          size="sm"
          onPress={() => _onCall(tasker?.phone, tasker?.isLeader)}
        >
          <Icon
            name="call"
            size="m"
            style={styles.btnCall}
          />
        </Button>
      );
    }
  };

  const ItemMoney = ({
    cost,
    content,
    testID,
  }: {
    cost: any;
    content: any;
    testID: any;
  }) => {
    if (!cost) return null;
    return (
      <Text
        testID={testID}
        fontSize="m"
        style={styles.lineHeight}
      >
        {content}
        {": "}
        <PriceItem
          cost={cost}
          priceStyle={styles.priceStyle}
          currencyStyle={styles.currencyStyle}
        />
      </Text>
    );
  };

  const _renderInfoUser = () => {
    return (
      <Box style={styles.containerAcceptTasker}>
        {acceptedTasker?.map((tasker, index) => (
          <Box
            row
            alignCenter
            key={"tasker" + index}
            style={styles.boxTasker}
          >
            <Avatar
              size={36}
              avatar={tasker?.avatar}
            />
            <Box
              flex
              style={styles.boxInfoTasker}
            >
              <Box
                row
                alignCenter
              >
                <Text
                  bold
                  style={styles.lineHeight}
                >
                  {tasker?.name}
                </Text>
                {tasker?.isLeader ? (
                  <Icon
                    name="leader"
                    color="secondary"
                    size="l"
                    style={styles.iconLeader}
                  />
                ) : null}
              </Box>
              <ItemMoney
                testID="leaderCost"
                cost={tasker?.cost}
                content={paymentMethod === CASH ? I18n.t("TASK_DETAIL.PAYMENT_MOTHOD_CASH") : I18n.t("TASK_DETAIL.PAYMENT_MOTHOD_BANKER") }
              />
              <ItemMoney
                testID="leaderPromotion"
                cost={tasker?.promotion}
                content={I18n.t("TASK_DETAIL.PAYMENT_MOTHOD_PROMOTION")}
              />
              <ItemMoney
                testID="leaderExtraMoney"
                cost={tasker?.extraMoney}
                content={I18n.t("TASK_DETAIL.PAYMENT_MOTHOD_CASH")}
              />
            </Box>
            {checkShowButtonCall(tasker, `callTasker${index}`)}
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Box style={styles.container}>
      {/* Number Tasker accepted */}
      <Box
        row
        alignCenter
        style={styles.lineContainer}
      >
        <Box
          row
          alignCenter
        >
          <Icon
            name="logoBtaskee"
            color="secondary"
          />
        </Box>
        <Box
          row
          style={styles.btnDetail}
        >
          <Text>{I18n.t("TASK_DETAIL.NUMBER_TASKER_ACCEPTED")}</Text>
          <Text bold>
            {numberTaskerAccepted}/{numberTasker}
          </Text>
        </Box>
        <TouchableOpacity
          style={styles.iconRight}
          onPress={_openModal}
        >
          <Icon
            name="faq"
            color="primary"
          />
        </TouchableOpacity>
      </Box>
      {/* Info Tasker */}
      {_renderInfoUser()}
    </Box>
  );
};

export default InfoTaskerAccepted;
