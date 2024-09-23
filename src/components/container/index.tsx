import React from "react";
import { View, StyleSheet, Dimensions, ViewProps } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { DefaultTheme } from "@react-navigation/native";
import { getDefaultHeaderHeight } from "@react-navigation/elements";
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Text } from "@src/components";
import { colors, fontSize, spacing } from "libs/theme";

// Khoảng cách giữa nội dung trang và header trang
const HEIGHT_WITH_HEADER = 10;

/**
 * Template của trang cơ bản
 */
interface ICustomContainer extends ViewProps {
  /**
   * Không có paddingTop từ header, dùng cho trang home
   */
  headerShow?: boolean;
  /**
   * Style của nội dungs
   */
  contentContainerStyle?: any;
  /**
   * Style của container ngoài cùng
   */
  style?: any;
  /**
   * Hiển thị LinearGradient toàn màn hình
   */
  isFullScreen?: boolean;
  /**
   * Tiêu đề trang
   */
  headerTitle?: string;
}

const defaultProps = {
  /**
   * Có thêm khoảng trắng bằng với header hay không
   */
  headerShow: true,
  /**
   * Toàn màn hình hoặc 1 phần
   */
  isFullScreen: false,
  headerTitle: null,
};

const { height } = Dimensions.get("window");
const HEIGHT_LINEAR = Math.round(height / 3);

/**
 * UI cơ bản cho trang, cần khai báo khi khởi tạo 1 trang mới
 */
const CustomContainer: React.FunctionComponent<ICustomContainer> = (props) => {
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets(); // for Iphone X
  const headerHeight =
    getDefaultHeaderHeight(frame, false, insets.top) + HEIGHT_WITH_HEADER;
  // Trang sẽ tự padding xuống bằng với chiều cao của header
  const paddingTop = props.headerShow ? headerHeight : 0;
  const heightOfLinearGradient = props.isFullScreen ? height : HEIGHT_LINEAR;
  return (
    <View style={[styles.container, { paddingTop: paddingTop }, props.style]}>
      {!props?.style?.backgroundColor ? (
        <LinearGradient
          colors={[
            "rgb(63,68,163)",
            "rgb(108,113,197)",
            DefaultTheme.colors.background,
          ]}
          style={[styles.linearGradient, { height: heightOfLinearGradient }]}
        ></LinearGradient>
      ) : null}

      {/* Custom header */}
      {props.headerTitle ? (
        <View style={[styles.header, { height: paddingTop }]}>
          <Text style={styles.title}>{props.headerTitle}</Text>
        </View>
      ) : null}

      {/* Content */}
      <View style={[styles.content, props.contentContainerStyle]}>
        {props.children}
      </View>
    </View>
  );
};

CustomContainer.defaultProps = defaultProps;

export default CustomContainer;

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.xl,
    fontWeight: "700",
    marginBottom: spacing.l,
    color: colors.white,
    allowFontScaling: false,
  },
  header: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  linearGradient: {
    position: "absolute",
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    overflow: "hidden",
  },
});
