import { getWebSocketUrl } from "libs/helper";
import config from "react-native-config";

export default () => {
  return `${config.WEB_SOCKET_ENPOINT}/v3/websocket-indo/chat${getWebSocketUrl()}`;
}
