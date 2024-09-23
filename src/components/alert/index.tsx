/**
 * @Filename: components/custom-alert.js
 * @Description:
 * @CreatedAt: 11/6/2020
 * @Author: DucAnh
 * @UpdatedAt: 4/1/2021
 * @UpdatedBy: Toan Huu, linhnh
 **/

import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { Modalize } from "react-native-modalize";
import _ from "lodash";

import { LocalizationContext } from "@src/libs/context";
import Header from "./header";
import Body from "./body";
import Actions from "./actions";

interface IAction {
  text: string;
  onPress?: () => void;
  style?: "ok" | "cancel";
  testID?: string
}

export interface IMessage {
  text: string;
  params?: any;
  notUsedI18n?: boolean;
}

export interface IAlertInfo {
  title?: string;
  message: [string] | [IMessage] | string | React.ReactNode;
  actions?: [IAction];
  onClosed?: () => void;
}

export default forwardRef((props, ref) => {
  const modalizeRef = useRef<Modalize>(null);
  const [info, setInfo] = useState<IAlertInfo | {}>({});
  const I18n = React.useContext(LocalizationContext);

  const localizationMessage = (message) => {
    // Là react node
    if (React.isValidElement(message)) {
      return message;
    }
    if (typeof message === "object") {
      // Khi truyền trực tiếp I18n hoặc text cố dịnh
      if (message.notUsedI18n) {
        return message?.text;
      }
      return I18n.t(message?.text, message?.params);
    }
    // truyền key trong localization
    return I18n.t(message);
  };

  const _handleClose = () => {
    modalizeRef.current?.close();
  };

  const _handleOpen = (info: IAlertInfo, onlyKey: boolean) => {
    Keyboard.dismiss();
    /**
     * info = {
      title,
      message,
        ex: 'KEY',
            ['KEY'],
            {text: 'KEY', params: {t: 'Param'}}

      actions: [{text: "close", onPress: () => {}, style: 'ok'}],
    }
     */
    // Nội dung đã được I18n
    if (!onlyKey) {
      setInfo(info);
      modalizeRef.current?.open();
      // return;
    }
    const newInfo: IAlertInfo | {} = {};
    // Tiêu đề, mặc định là chữ Thông báo nếu không truyền vào
    newInfo["title"] = info.title
      ? I18n.t(info.title)
      : I18n.t("DIALOG.TITLE_INFORMATION");
    // danh sách nội dung
    if (_.isArray(info.message)) {
      newInfo["message"] = info.message.map((message) =>
        localizationMessage(message)
      );
    } else {
      newInfo["message"] = localizationMessage(info.message);
    }

    // các nút action
    if (info.actions) {
      newInfo["actions"] = info.actions.map((e) => ({
        text: I18n.t(e.text),
        onPress: e.onPress || _handleClose, // auto close alert if onPress not exist
        style: e.style || "ok", // default style ok
        testID: e?.testID 
      }));
    } else if (info.actions !== null) {
      // button close default
      newInfo["actions"] = [
        {
          text: I18n.t("DIALOG.BUTTON_CLOSE"),
          onPress: () => _handleClose(),
          testID: "btnClose",
          style: "ok",
        },
      ];
    }

    // event được gọi khi đóng alert xong
    if (info.onClosed) {
      newInfo["onClosed"] = info.onClosed;
    }

    // set thông tin alert
    setInfo(newInfo);

    // mở alert lên
    modalizeRef.current?.open();
  };

  // can call from parent component, with useRef
  useImperativeHandle(ref, () => ({
    open(info: IAlertInfo, onlyKey: boolean = false) {
      _handleOpen(info, onlyKey);
    },
    close() {
      _handleClose();
    },
  }));

  return (
    <Modalize
      ref={modalizeRef}
      adjustToContentHeight={true}
      onClosed={() => info?.onClosed && info?.onClosed()}
    >
      <View style={styles.container}>
        <Header title={info.title} />
        <Body content={info.message} />
        <Actions actions={info.actions} />
      </View>
    </Modalize>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
