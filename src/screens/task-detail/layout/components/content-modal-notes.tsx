/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-25 10:42:16
 * @modify date 2022-10-25 10:42:16
 * @desc [Render content modal notes]
 */

import React, { FC, useMemo, useState } from "react";
import { TouchableOpacity } from "react-native";
import _ from "lodash";

import { Box, Text } from "@src/components";
import translateNotesAPI, { IParamTranslateNotes } from "apis/tasks/translate-notes";
import { useI18n } from "hooks/translation";
import { statusTask } from "libs/config";
import { handleError, IRespond, replaceInvalidCharacterToString } from "libs/helper";
import { setLoading } from "redux/slice/app-slice";
import { store } from "redux/store";

import styles from "../styles";

interface IContentModalFullNotes {
  dataTask: any;
  setDataTask: (any) => void;
}

const ContentModalFullNotes: FC<IContentModalFullNotes> = ({ dataTask, setDataTask }) => {
  const { t } = useI18n();
  const [dataNoteTranslated, setDataNoteTranslated] = useState();

  const _onTranslateNotes = async () => {
    // Check exist task note translated
    if (dataTask?.taskNoteTranslated) {
      return;
    }
    const param: IParamTranslateNotes = {
      taskId: dataTask?._id,
    };
    // Hide loading
    await store.dispatch(setLoading(true));
    // Call api translate task notes
    const resultTranslate: IRespond = await translateNotesAPI(param);
    // Hide loading
    await store.dispatch(setLoading(false));
    if (resultTranslate?.isSuccess) {
      // Set translatedText local
      setDataNoteTranslated(resultTranslate?.data?.translatedText);
      // Save translatedText to task item
      const newDataTask = _.cloneDeep(dataTask);
      newDataTask.translatedNote = resultTranslate?.data?.translatedText;
      return setDataTask(newDataTask);
    }
    return handleError(resultTranslate?.error);
  };

  const _renderNoteTranslated = useMemo(() => {
    let newNote = dataTask?.translatedNote || dataNoteTranslated;
    if (dataTask?.status !== statusTask.confirmed) {
      newNote = replaceInvalidCharacterToString(dataTask?.translatedNote || dataNoteTranslated);
    }
    return (
      <Box
        center
        style={styles.boxNoteTranslated}
      >
        <Text testID="txtNoteTranslated">{newNote}</Text>
      </Box>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataTask?.translatedNote, dataNoteTranslated]);

  const _renderButtonTranslate = useMemo(() => {
    if (dataTask?.translatedNote || dataNoteTranslated) {
      return null;
    }
    return (
      <TouchableOpacity
        testID="btnTranslateNote"
        onPress={_onTranslateNotes}
        style={styles.btnTranslateNote}
      >
        <Text
          bold
          fontSize="m"
          color="primary"
        >
          {t("TASK_DETAIL.BUTTON_TRANSLATE_NOTE")}
        </Text>
      </TouchableOpacity>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataTask?.translatedNote, dataNoteTranslated]);

  const _handleNote = useMemo(() => {
    // Nếu có translatedNote return
    if (dataTask?.translatedNote || dataNoteTranslated) {
      return null;
    }
    // Thay thế các từ k hợp lệ thành ***
    let newNote = dataTask?.note;
    if (dataTask?.status !== statusTask.confirmed) {
      newNote = replaceInvalidCharacterToString(dataTask?.note);
    }
    return (
      <Box
        center
        style={styles.containerTaskNoteTranslated}
      >
        <Text>{newNote}</Text>
      </Box>
    );
  }, [dataTask, dataNoteTranslated]);

  return (
    <Box
      flex
      style={styles.containerNote}
    >
      {/* Notes */}
      {_handleNote}
      {/* End notes */}
      {_renderButtonTranslate}
      {/* Notes translated */}
      {_renderNoteTranslated}
      {/* End notes translated */}
    </Box>
  );
};

export default ContentModalFullNotes;
