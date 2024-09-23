/* global WebSocket */
/* eslint no-unused-vars: "off" */
import React, { Component } from "react";
import moment from "moment";
import NetInfo from "@react-native-community/netinfo";
import { AppState } from "react-native";
import { getAccessApiKey } from "libs/helper";

const TIMEOUT_CLOSE_SOCKET = 5 * 60 * 1000;
const TIMEOUT_CHECK_CONNECTION = 30; // After 10s app lauched
class WS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ws: null,
      appState: AppState.currentState,
    };
    this.numberOfReconnect = 0;
    this.timeoutId;
    this.listener = null;
    // Sau bao lâu mới cho lắng nghe sự kiện thay dổi net
    this.current = null;
  }

  static defaultProps = {
    reconnect: false,
  };

  send = (data) => this.state?.ws?.send(data);

  _removeTimeout = () => {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  };

  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      // check socket close and open again
      // 2 is CLOSING, 3 is CLOSED
      if (
        !this.state.ws ||
        this.state?.ws?.readyState === 2 ||
        this.state?.ws?.readyState === 3
      ) {
        // connect again
        this._handleWebSocketSetup();
      } else {
        // not auto close socket when socket is OPEN
        this._removeTimeout();
      }
    }

    // Check app in background and close socket
    if (nextAppState === "inactive" || nextAppState === "background") {
      // TODO: Đóng socket khi appState change (Yêu cầu từ API)
      this?.state?.ws?.close();
      // this._removeTimeout();
      // this.timeoutId = setTimeout(() => {
      //   this?.state?.ws?.close();
      // }, TIMEOUT_CLOSE_SOCKET);
    }

    this.setState({ appState: nextAppState });
  };

  componentDidMount() {
    this.reconnect = !!this.props.reconnect;
    this.current = moment().add(TIMEOUT_CHECK_CONNECTION, "seconds");
    // Init
    this._handleWebSocketSetup();
    // Event change state app
    this.listener = AppState.addEventListener(
      "change",
      this._handleAppStateChange
    );
    // Subscribe net change
    this.unsubscribe = NetInfo.addEventListener((state) => {
      if (
        (!this.state.ws ||
          this.state?.ws?.readyState === 2 ||
          this.state?.ws?.readyState === 3) &&
        state.isConnected
      ) {
        // Khi mới mở app hoặc login lần đầu, sẽ không check event này trong 1 thời gian đầu
        if (moment().isAfter(this.current)) {
          this._handleWebSocketSetup();
        }
      }
    });
  }

  componentWillUnmount() {
    this.reconnect = false;
    this?.state?.ws?.close();
    this.listener && this.listener.remove();
    this._removeTimeout();
    this?.unsubscribe();
  }

  render() {
    return null;
  }

  _handleWebSocketSetup = () => {
    // Make sure close after call reconnect
    this?.state?.ws?.close && this?.state?.ws?.close();
    // Connect
    const ws = new WebSocket(this.props.url, null, {
      headers: {
        accessKey: getAccessApiKey(),
      },
    });
    ws.onopen = () => {
      // console.log("==================onopen=================");
      // console.log(this.props.url);
      // console.log("====================================");
      this.props.onOpen && this.props.onOpen();
    };
    ws.onmessage = (event) => {
      this.props.onMessage && this.props.onMessage(event);
    };
    ws.onerror = (error) => {
      // console.log("==================onerror=================");
      // console.log();
      // console.log("====================================");
      this.props.onError && this.props.onError(error);
    };
    ws.onclose = () => {
      // console.log("==================onclose=================");
      // console.log();
      // console.log("====================================");
      this.props.onClose && this.props.onClose();
    };
    this.setState({ ws });
  };
}

export default WS;
