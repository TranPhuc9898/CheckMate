import {
  StyleSheet,
} from 'react-native';
import {colors, fontSize, spacing, borderRadius} from "@src/libs/theme";
// import helpers from "../../lib/helpers";

export default StyleSheet.create({
  txtTitle: {

  },
  txtSeeVideo: {
    marginVertical: spacing.l
  },
  txtContent: {
    lineHeight: 22,
  },
  txtSummary: {
    marginVertical: spacing.m
  },
  video: {
    marginVertical: spacing.xl
  },
  answerCampareRight: {
    backgroundColor: colors.success,
  },
  answerCampareWrong: {
    backgroundColor: colors.error,
  },
  txtNavigationActive: {
    color: colors.white,
    fontWeight: 'bold',
  },
  targetContent: {
    paddingLeft: spacing.m,
  },
  processBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.l,
    paddingLeft: 0,
  },
  processIn: {
    height: 5,
    backgroundColor: colors.secondary,
    borderRadius: 3,
  },
  processBar: {
    flex: 1,
    backgroundColor: colors.grey3,
    height: 5,
    borderRadius: 3,
  },
  containerNavigation: {
    backgroundColor: colors.white,
    // padding: 15,
    // paddingBottom: helpers.isIphoneX() ? 37 : 15,
  },
  btnNavigationQuizContent: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnNavigationQuizContentActive: {
    height: 40,
    width: 40,
    borderRadius: 20,
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  btnNavigationQuiz: {
    marginRight: 15
  },
  containerItem: {
    // padding: spacing.xl,
    marginBottom: spacing.xl,
  },
  contentQuestion: {
    marginVertical: spacing.l
  },
  contentAnswer: {
    
  },
  txtQuestion: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  txtAnswer: {
    lineHeight: 24,
  },
  btnAnswer: {
    backgroundColor: colors.white,
    padding: spacing.m,
    borderRadius: borderRadius.s,
    borderWidth: 1,
    borderColor: '#dddddd',
    marginBottom: spacing.l,
  },
  btnSelected: {
    backgroundColor: colors.primary,
  },
  txtSelected: {
    color: colors.white
  },
  txtStt: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
  }
});
