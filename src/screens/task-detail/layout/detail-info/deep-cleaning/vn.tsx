/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2023-03-16 18:21:24
 * @modify date 2023-03-16 18:21:24
 * @desc [Deep cleaning detail]
 */

import { FC } from "react";
import { IDetailInfo } from "..";
import InfoTaskerAccepted from "./components/info-accepted-tasker";

const DeepCleaningDetail: FC<IDetailInfo> = ({
  paymentMethod,
  acceptedTasker,
  detail,
  status,
}) => {
  return (
    <InfoTaskerAccepted
      paymentMethod={paymentMethod}
      acceptedTasker={acceptedTasker}
      detail={detail}
      status={status}
    />
  );
};

export default DeepCleaningDetail;
