import Locked from "./locked";
import Processing from "./processing"
import { statusJourney } from "../..";

const ConditionItem = (props) => {
  const components = new Map([
    // TODO: Đổi passed qua Processing
    [statusJourney.passed, <Processing {...props} />],
    [statusJourney.lock, <Locked {...props} />],
    [statusJourney.processing, <Processing {...props} />],
  ]);
  return components.get(props?.status);
};

export default ConditionItem;
