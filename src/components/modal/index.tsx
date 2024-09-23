/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-21 10:03:50
 * @modify date 2022-10-21 10:03:50
 * @desc [Modal]
 */

import { spacing } from "libs/theme";
import React, { forwardRef, useImperativeHandle, useRef, ComponentPropsWithRef } from "react";
import { StyleSheet } from "react-native";
import { Modalize,  } from "react-native-modalize";

interface IModal {
  HeaderComponent?: string;
  
}

export default forwardRef((props: any, ref) => {
  const modalizeRef = useRef<Modalize | null>(null);

  const _handleClose = () => {
    modalizeRef.current?.close();
  };

  const _handleOpen = () => {
    modalizeRef.current?.open();
  };

  // can call from parent component, with useRef
  useImperativeHandle(ref, () => ({
    open() {
      _handleOpen();
    },
    close() {
      _handleClose();
    },
  }));

  return (
    <Modalize
      ref={modalizeRef}
      adjustToContentHeight={true}
      HeaderComponent={props?.HeaderComponent}
      rootStyle={props?.rootStyle}
      disableScrollIfPossible={false}
    >
      {props.children}
    </Modalize>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
