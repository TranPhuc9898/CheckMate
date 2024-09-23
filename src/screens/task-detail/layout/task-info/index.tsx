import React, { FC } from "react";
import _ from "lodash";

import { Box, Card, Divider, TaskItem } from "components";
import { getUserIdGlobal } from "libs/helper";
import { colors } from "libs/theme";

import {
  Address,
  AvgRatingAsker,
  BCare,
  CountdownDetail,
  CustomerDetail,
  FooterTaskDetail,
  NoteForNewAsker,
  NumberTaskerAcceptedTask,
  OftenUseService,
  Requirements,
  TaskNote,
  TypeHouseAndDuration,
  WorkedForAsker,
} from "../components";
import BringCleaningTool from "../components/bring-cleaning-tool";
import ListTask from "../components/list-task";
import QRTaskDetail from "../components/qr-task";
import CostIncurred from "../cost-incurred/index";
import DetailInfo from "../detail-info/index";
import styles from "../styles";

export interface ITaskInfo {
  dataTask: any; // Data task
  navigation: any;
  setDataTask: (data: any) => void;
  openModalCancelTask: () => void;
}

const TaskInfo: FC<ITaskInfo> = ({ dataTask, navigation, setDataTask, openModalCancelTask }) => {
  if (_.isEmpty(dataTask)) {
    return null;
  }
  const {
    _id,
    lat,
    lng,
    pet,
    date,
    phone,
    status,
    detail,
    isStart,
    address,
    isMember,
    isLeader,
    homeType,
    duration,
    avgRating,
    promotion,
    isEmployee,
    extraMoney,
    isReceived,
    isNewAsker,
    contactName,
    description,
    serviceName,
    laundryDate,
    numberRating,
    requirements,
    isMapDisabled,
    paymentMethod,
    collectionDate,
    acceptedTasker,
    isWorkedForAsker,
    workingProcessV2,
    isOftenUseService,
    listOfToolsForTasker,
  } = dataTask;
  const taskerId = getUserIdGlobal();
  const taskId = dataTask._id;

  const _handleRenderAskerAnalysis = () => {
    if (Boolean(!avgRating || !numberRating) && !isNewAsker) {
      return null;
    }
    return (
      <Card>
        {/* NoteForNewAsker */}
        <NoteForNewAsker isNewAsker={isNewAsker} />
        {/* End NoteForNewAsker */}

        {/* Worked for Asker */}
        <WorkedForAsker isWorkedForAsker={isWorkedForAsker} />
        {/* End worked for Asker */}

        {/* Asker often use bTaskee's service */}
        <OftenUseService isOftenUseService={isOftenUseService} />
        {/* End Asker often use bTaskee's service */}

        {/* AvgRatingAsker */}
        <AvgRatingAsker
          numberRating={numberRating}
          avgRating={avgRating}
        />
        {/* End trust point */}

        {/* bCare */}
        <BCare />
        {/* End bCare */}
      </Card>
    );
  };

  return (
    <Box style={styles.container}>
      {/* Count down */}
      <CountdownDetail
        duration={duration}
        date={date}
        isStarted={isStart}
      />
      {/* End count down */}

      {/* Header */}
      <TaskItem
        item={dataTask}
        disabled={true}
      />
      {/* End header */}

      <CostIncurred
        isMember={isMember}
        isLeader={isLeader}
        promotion={promotion}
        status={status}
        extraMoney={extraMoney}
      />
      <Card>
        {/* Customer info */}
        <CustomerDetail
          contactName={contactName}
          status={status}
        />
        {/* End customer info */}

        {/* Address */}
        <Address
          lat={lat}
          lng={lng}
          address={address}
          isMapDisabled={isMapDisabled}
        />
        {/* End address */}

        {/* Type house and duration */}
        <TypeHouseAndDuration
          detail={detail}
          status={status}
          homeType={homeType}
          duration={duration}
          description={description}
          serviceName={serviceName}
        />
        {/* End type house and duration */}

        {/* Divider */}
        <Divider
          style={styles.marginTopLarge}
          color={colors.grey0}
        />
        {/* End divider */}

        {/* Requirements */}
        <Requirements
          pet={pet}
          duration={duration}
          requirements={requirements}
        />
        {/* End requirements */}

        {/* Bring cleaning tool */}
        <BringCleaningTool listOfToolsForTasker={listOfToolsForTasker} />

        {/* List task */}
        <ListTask
          overviews={workingProcessV2?.overview || []}
          details={workingProcessV2?.detail || []}
        />

        {/* Detail service */}
        <DetailInfo
          acceptedTasker={acceptedTasker}
          collectionDate={collectionDate}
          paymentMethod={paymentMethod}
          requirements={requirements}
          serviceName={serviceName}
          laundryDate={laundryDate}
          isReceived={isReceived}
          duration={duration}
          detail={detail}
          status={status}
          date={date}
        />
        {/* End detail service */}

        {/* Number tasker accepted task */}
        <NumberTaskerAcceptedTask
          acceptedTasker={acceptedTasker}
          serviceName={serviceName}
          status={status}
          detail={detail}
        />
        {/* End number tasker accepted task */}
      </Card>

      {/* Note */}
      <TaskNote
        dataTask={dataTask}
        setDataTask={setDataTask}
      />
      {/* End note */}

      {/* Asker analytic */}
      {_handleRenderAskerAnalysis()}
      {/* End asker analytic */}

      {/* QR code for Task */}
      <QRTaskDetail
        status={status}
        qrcodeData={`T-${taskId}-W-${taskerId}`}
      />
      {/* End QR code */}

      {/* Footer */}
      <FooterTaskDetail
        date={date}
        taskId={_id}
        phone={phone}
        detail={detail}
        status={status}
        isStarted={isStart}
        duration={duration}
        navigation={navigation}
        isEmployee={isEmployee}
        serviceName={serviceName}
        isMember={Boolean(isMember)}
        acceptedTasker={acceptedTasker}
        openModalCancelTask={openModalCancelTask}
      />
      {/* End footer */}
    </Box>
  );
};
export default TaskInfo;
