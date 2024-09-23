import Passed from "./passed";
import Locked from "./locked";
import Processing from "./processing"
import { statusJourney } from "../..";

const CardLevel = (props) => {
  const components = new Map([
    [statusJourney.passed, <Passed {...props} />],
    [statusJourney.lock, <Locked {...props} />],
    [statusJourney.processing, <Processing {...props} />],
  ]);
  return components.get(props?.item?.status);
};

export default CardLevel;
