import FooterNormalService from "./footer-normal-service";
import FooterLaundryService from "./footer-laundry-service";
import { services, statusTask } from "libs/config";
import { Card } from "components";

const LIST_STATUS_TASK_SHOW_FOOTER = [
  statusTask.confirmed,
  statusTask.waiting,
  statusTask.posted,
];

const _checkFooterContent = (props) => {
  // Check isReceive clothes
  if (props?.serviceName === services.laundry) {
    return <FooterLaundryService {...props} />;
  }
  return <FooterNormalService {...props} />;
};

const RenderFooterButton = (props) => {
  if (LIST_STATUS_TASK_SHOW_FOOTER.indexOf(props?.status) === -1) {
    return null;
  }
  return <Card>{_checkFooterContent(props)}</Card>;
};

export default RenderFooterButton;
