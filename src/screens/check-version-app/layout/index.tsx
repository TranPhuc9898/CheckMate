import { useSelector } from "react-redux";
import { RootState } from "redux/slice";
import CheckNewVersion from "screens/check-version-app/check-new-version";
import CheckVersionMaintain from "screens/check-version-app/check-version-maintain";

const CheckVersionApp = () => {
  const { newVersionInfo } = useSelector((state: RootState) => state.app);

  // Nếu isMaintain === true hệ thống bảo trì
  if (newVersionInfo?.isMaintain) {
    return <CheckVersionMaintain />;
  }
    // Nếu isForce === true update lại
    if (newVersionInfo?.newVersion?.isForce) {
      return <CheckNewVersion />;
    }
  return null;
};

export default CheckVersionApp;
