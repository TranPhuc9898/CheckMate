import { StyleSheet } from "react-native";
import { colors, spacing } from "@src/libs/theme";

export default StyleSheet.create({
  containerCancelPolicy: {
    height: 250,
    marginVertical: spacing.s,
    marginBottom: spacing.m,
  },
  directionBox: {
    flexDirection: "row",
    paddingTop: spacing.l,
  },
  textContent: {
    flex: 1,
    paddingTop: spacing.s,
  },
  contentContainer: {
    paddingBottom: spacing.xxxl,
  },
  image: {
    width: spacing.xxxl,
    height: spacing.xxxl,
  },
  textStyle: {
    paddingTop: spacing.s,
    paddingBottom: spacing.l,
  },
  boxShareSuccess: {
    paddingLeft: spacing.xxl,
    paddingRight: spacing.xxl,
    paddingTop: spacing.xxxl,
  },
  cardStyle: {
    backgroundColor: colors.secondary3,
    borderColor: colors.secondary1,
    borderWidth: 2,
    borderRadius:10,
    paddingTop:15,
    paddingHorizontal:spacing.m
},
  containerBox: {
    paddingVertical: spacing.s,
  },
  text: {
    paddingTop: spacing.s,
  },
  text2: {
    fontSize: spacing.l,
  },
  text3: {
    fontSize: spacing.l,
    paddingLeft:10
  },
  boxContainer: {
    paddingRight: spacing.m,
  },
  lottieBell: {
    width: 50,
    height: 50,
    tintColor: "black",
  },
  button: {
    borderWidth: 1,
  },
  styleNoti: {
    justifyContent: "flex-end",
    paddingRight: spacing.l,
    paddingTop:spacing.l,
    paddingBottom:spacing.l
  },
  container:{
    paddingBottom:spacing.xxxl
  },
  boxIcon: {
    paddingLeft: 5
  },
  containerReferral: {
    marginTop: spacing.m
  },
  buttonStyle: {
    backgroundColor: colors.secondary3,
    borderColor: colors.secondary,
    borderWidth: 1,
  },
  txtBtnStyle: {
    color: colors.secondary,
  }
});
