import Passed from "./passed";
import Locked from "./locked";
import Processing from "./processing"
import { statusJourney } from "../..";

const BonusJourney = (props) => {
  const components = new Map([
    // TODO: Đổi passed thành processing
    [statusJourney.passed, <Processing {...props} />],
    [statusJourney.lock, <Locked {...props} />],
    [statusJourney.processing, <Processing {...props} />],
  ]);
  return components.get(props?.status);
};

export default BonusJourney;
