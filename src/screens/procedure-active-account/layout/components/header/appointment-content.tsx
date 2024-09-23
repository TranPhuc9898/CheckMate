import _ from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";
import Approved from "./status/approved";
import Processing from "./status/processing";
import Success from "./status/success";

const statusTaskerProfileInfo = {
  approved: "APPROVED",
  processing: "PROCESSING",
  rejected: "REJECTED",
};

const AppointmentContent = () => {
  const { taskerProfileInfo } = useSelector((state: RootState) => state.app);

  if (!_.isEmpty(taskerProfileInfo?.appointmentInfo)) {
    const { date, address, phoneNumber } = taskerProfileInfo.appointmentInfo;
    return (
      <Success
        date={date}
        address={address}
        phoneNumber={phoneNumber}
      />
    );
  }
  if (taskerProfileInfo?.status === statusTaskerProfileInfo.approved) {
    return <Approved />;
  }
  return <Processing />;
};
export default AppointmentContent;
