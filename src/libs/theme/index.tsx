/**
 * @author Duc Anh Pham
 * @email ducanh.pham@btaskee.com
 * @create date 2022-10-11 09:15
 * @modify date 2022-10-11 09:15
 * @desc theme of app
 */

import { createTheme } from "@rneui/themed";
import {
  SECONDARY_COLOR,
  BACKGROUND_COLOR,
  WHITE_COLOR,
  BLACK_COLOR,
  BLACK_COLOR_1,
  GREY1_COLOR,
  GREY2_COLOR,
  GREY3_COLOR,
  SUCCESS_COLOR,
  ERROR_COLOR,
  WARNING_COLOR,
  FONT_INTER_BOLD,
  FONT_INTER_NORMAL,
  FONT_INTER_LIGHT,
  BORDER_RADIUS_L,
  BORDER_RADIUS_S,
  BORDER_RADIUS_XS,
  SECONDARY_COLOR_2,
  CHAT_LEFT_COLOR,
  CHAT_RIGHT_COLOR,
  GREY0_COLOR,
  GREY4_COLOR,
  GREY5_COLOR,
  PRIMARY2_COLOR,
  PRIMARY3_COLOR,
  PRIMARY0_COLOR,
  PRIMARY1_COLOR,
  BUTTON_SM,
  BUTTON_MD,
  BUTTON_LG,
  /* ------------------------------ SPACING SIZE ------------------------------ */
  SPACING_S,
  SPACING_M,
  SPACING_L,
  SPACING_XL,
  SPACING_XXL,
  SPACING_XXXL,
  /* ---------------------------- END SPACING SIZE ---------------------------- */

  /* -------------------------------- FONT SIZE ------------------------------- */
  FONT_SIZE_S,
  FONT_SIZE_M,
  FONT_SIZE_L,
  FONT_SIZE_XL,
  FONT_SIZE_XXL,
  FONT_SIZE_XXXL,
  /* ------------------------------ END FONT SIZE ----------------------------- */
  FONT_WEIGHT_S,
  FONT_WEIGHT_M,
  FONT_WEIGHT_L,
  FONT_WEIGHT_XL,
  SECONDARY_COLOR_1,
  SECONDARY_COLOR_3,
  FONT_KANIT_BOLD,
  FONT_KANIT_NORMAL,
  FONT_KANIT_LIGHT,
  BACKGROUND_COLOR_GREY,
  GREY6_COLOR,
} from "@src/libs/constants";

export const colors = {
  primary: PRIMARY0_COLOR,
  primary1: PRIMARY1_COLOR,
  primary2: PRIMARY2_COLOR,
  primary3: PRIMARY3_COLOR,
  secondary: SECONDARY_COLOR,
  secondary1: SECONDARY_COLOR_1,
  secondary2: SECONDARY_COLOR_2,
  secondary3: SECONDARY_COLOR_3,
  background: BACKGROUND_COLOR,
  backgroundGrey: BACKGROUND_COLOR_GREY,
  white: WHITE_COLOR,
  black: BLACK_COLOR,
  black1: BLACK_COLOR_1,
  grey0: GREY0_COLOR,
  grey1: GREY1_COLOR, // color of text grey
  grey2: GREY2_COLOR,
  grey3: GREY3_COLOR, //  borderColor
  grey4: GREY4_COLOR,
  grey5: GREY5_COLOR,
  grey6: GREY6_COLOR,
  success: SUCCESS_COLOR,
  error: ERROR_COLOR,
  warning: WARNING_COLOR,
  leftChat: CHAT_LEFT_COLOR,
  rightChat: CHAT_RIGHT_COLOR,
};

interface ISpacing {
  /**
   * 5
   */
  s: number;
  /**
   * 10
   */
  m: number;
  /**
   * 15
   */
  l: number;
  /**
   * 20
   */
  xl: number;
  /**
   * 25
   */
  xxl: number;
  /**
   * 30
   */
  xxxl: number;
}

interface IFontSize {
  /**
   * 10
   */
  s: number;
  /**
   * 14
   */
  m: number;
  /**
   * 16
   */
  l: number;
  /**
   * 20
   */
  xl: number;
  /**
   * 25
   */
  xxl: number;
  /**
   * 32
   */
  xxxl: number;
}

interface IButtonSize {
  /**
   * 32
   */
  sm: number;
  /**
   * 36
   */
  md: number;
  /**
   * 56
   */
  lg: number;
}
interface IFontFamily {
  bold: string;
  normal: string;
  light: string;
}
interface IBorder {
  /**
  * 8
  */
  xs: number;
  /**
   * 15
   */
  s: number;
  /**
   * 50
   */
  l: number;
}

interface IFontWeight {
  /**
   * 400
   */
  s: string;
  /**
   * 500
   */
  m: string;
  /**
   * 600
   */
  l: string;
  /**
   * 700
   */
  xl: string;
}
export const spacing: ISpacing = {
  s: SPACING_S,
  m: SPACING_M,
  l: SPACING_L,
  xl: SPACING_XL,
  xxl: SPACING_XXL,
  xxxl: SPACING_XXXL,
};

export const fontSize: IFontSize = {
  s: FONT_SIZE_S,
  m: FONT_SIZE_M,
  l: FONT_SIZE_L,
  xl: FONT_SIZE_XL,
  xxl: FONT_SIZE_XXL,
  xxxl: FONT_SIZE_XXXL,
};

export const fontFamily: IFontFamily = {
  bold: FONT_INTER_BOLD,
  normal: FONT_INTER_NORMAL,
  light: FONT_INTER_LIGHT,
};

export const fontKanit: IFontFamily = {
  bold: FONT_KANIT_BOLD,
  normal: FONT_KANIT_NORMAL,
  light: FONT_KANIT_LIGHT,
};

export const theme = createTheme({
  lightColors: colors,
  darkColors: colors,
});

export const borderRadius: IBorder = {
  xs: BORDER_RADIUS_XS,
  s: BORDER_RADIUS_S,
  l: BORDER_RADIUS_L,
};

export const buttonSize: IButtonSize = {
  sm: BUTTON_SM,
  md: BUTTON_MD,
  lg: BUTTON_LG,
};

export const fontWeightTheme: IFontWeight = {
  s: FONT_WEIGHT_S,
  m: FONT_WEIGHT_M,
  l: FONT_WEIGHT_L,
  xl: FONT_WEIGHT_XL,
};
